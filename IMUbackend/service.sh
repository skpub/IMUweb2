#!/bin/bash
# TMUXセッションでマイクラサーバを開始してくれるSystemdスクリプト用のbashスクリプト

source .env
cd $MC_HOME
MC_START_CMD="java -jar -Xmx8G -XX:+UseZGC $(cat /home/kaito/MCServer/current_jar)"

TMUX_SOCKET="minecraft"
TMUX_SESSION="minecraft"

is_server_running() {
    tmux -L $TMUX_SOCKET has-session -t $TMUX_SESSION > /dev/null 2>&1
    return $?
}

mc_command() {
    cmd="$1"
    tmux -L $TMUX_SOCKET send-keys -t $TMUX_SESSION.0 "$cmd" ENTER
    return 0
}

start_server() {
    if is_server_running; then
        echo "Server already running"
        return 1
    fi
    echo "Starting minecraft server in tmux session"
    tmux -L $TMUX_SOCKET new-session -c $MC_HOME -s $TMUX_SESSION -d "$MC_START_CMD"

    return 0
}

backup() {
    if is_server_running; then
        echo "backup: Server is running so save-all"
        mc_command "save-all flush"
        MC_LOG="$MC_HOME/logs/latest.log"

        echo "Waiting for save-all flush to complete..."
        if ! timeout 60 tail -Fn0 "$MC_LOG" | grep -m1 "Saved the game"; then
            echo "Timed out waiting for save-all flush"
            return 1
        fi
    fi

    zfs snapshot $ZFS_TANK@$(date '+%Y%m%d_%H%M%S')

    # 指定された世代数より古い世代のsnapshotを削除
    zfs list -H -o name -t snapshot -s creation "$ZFS_TANK" \
        | tail -n +$((GENERATION+1)) \
        | xargs -n 1 zfs destroy
    return $?
}

restore() {
    if is_server_running; then
        echo "restore: Server is running"
        return 1
    fi
    if [ -z "$2" ]; then
        echo "Usage: $0 restore <snapshot_name>"
        return 1
    fi
    ARG="$2"

    # -r で中間のsnapshotが削除されることに注意
    zfs rollback -r $ZFS_TANK@$ARG
    return $?
}

stop_server() {
    if ! is_server_running; then
        echo "Server is not running!"
        return 1
    fi

    # Warn players
    mc_command "say サーバを閉じるよ。10秒で支度しな。"
    sleep 10

    # Issue shutdown
    echo "Kicking players"
    mc_command "kickall"
    echo "Stopping server"
    mc_command "stop"

    # Wait for server to stop
    wait=0
    while is_server_running; do
        sleep 1

        wait=$((wait+1))
        if [ $wait -gt 60 ]; then
            echo "Could not stop server, timeout"
            return 1
        fi
    done

    return 0
}

reload_server() {
    tmux -L $TMUX_SOCKET send-keys -t $TMUX_SESSION.0 "reload" ENTER
    return $?
}

case "$1" in
start)
    start_server
    exit $?
    ;;
stop)
    stop_server
    exit $?
    ;;
reload)
    reload_server
    exit $?
    ;;
backup)
    backup
    exit $?
    ;;
restore)
    restore
    exit $?
    ;;
*)
    echo "Usage: ${0} {start|stop|reload}"
    exit 2
    ;;
esac
