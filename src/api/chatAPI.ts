

export type ItemResponseType = {
    message: string
    photo: string
    userId: number
    userName: string
}


let ws: WebSocket | null = null

const createChanel = () => {
    cleanUp()
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('close', closeHandler)
}

const openHandler = () => {
    notifySubscribersStatusWS('ready')
    //console.log('WS Open');
}

const errorHandler = () => {
    //console.log('error happen');
    notifySubscribersStatusWS('error')
}

const messageHandler = (e: MessageEvent) => {
    const items = JSON.parse(e.data)
    subscribers["items-receivers"].forEach(s => s(items))
    //console.log(items);
}

const closeHandler = () => {
    //console.log('WS Close');
    notifySubscribersStatusWS('pending')
    setTimeout(() => {
        createChanel()
    }, 3000);
}

const cleanUp = () => {
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('close', closeHandler)
}


const notifySubscribersStatusWS = (statusWS: StatusWSType) => {
    subscribers["statusWS-receivers"].forEach(s => s(statusWS))
}

const subscribers = {
    'items-receivers': [] as ItemsSubscribeType[],
    'statusWS-receivers': [] as StatusWSSubscribeType[]
}

export type EventsNamesType = 'items-receivers' | 'statusWS-receivers'

export const chatAPI = {
    subscribe(eventName: EventsNamesType, func: ItemsSubscribeType | StatusWSSubscribeType) {
        //@ts-ignore
        subscribers[eventName].push(func)
        //subscribers["items-receivers"].push(func)
    },
    unsubscribe(eventName: EventsNamesType, func: ItemsSubscribeType | StatusWSSubscribeType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== func)
    },
    start() {
        createChanel()
    },
    stop() {
        notifySubscribersStatusWS('pending')
        subscribers["items-receivers"] = []
        subscribers["statusWS-receivers"] = []
        cleanUp()
        ws?.close()

        //console.log('ws was stopped');
    },
    send(message: string) {
        ws?.send(message)
    }
}

export type ItemsSubscribeType = (items: ItemResponseType[]) => void
export type StatusWSSubscribeType = (status: StatusWSType) => void
export type StatusWSType = 'pending' | 'ready' | 'error'