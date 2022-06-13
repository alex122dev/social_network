import style from './ChatPage.module.scss'
import globalStyle from '../../globalStyles/globalStyle.module.scss'
import { useSelector } from 'react-redux';
import { selectorGetChatItems, selectorGetChatStatusWS } from '../../redux/chat-selectors';
import { KeyboardEvent, UIEvent, useEffect, useRef, useState } from 'react';
import { DispatchThunkType } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { sendMessage, subscribeToReceiveWSData, unsubscribeToReceiveWSData } from '../../redux/chat-reducer';
import { ItemResponseType } from '../../api/chatAPI';
import photoPlaceholder from '../../assets/img/user-image.png'

export const ChatPage = () => {


    return <div>
        <Chat />
    </div>
}

export const Chat = () => {
    const dispatch: DispatchThunkType = useDispatch()
    const statusWS = useSelector(selectorGetChatStatusWS)
    //console.log(statusWS);


    useEffect(() => {
        dispatch(subscribeToReceiveWSData())
        return () => {
            dispatch(unsubscribeToReceiveWSData())
        }
    }, [])

    return <div className={style.chat}>
        {statusWS === 'error' && <div>Some error occured. Refresh pages</div>}
        <Messages />
        <AddNewMessageFrom />
    </div>
}

export const Messages = () => {
    const items = useSelector(selectorGetChatItems)
    const anchorElementRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoscroll] = useState(true)

    const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget
        if (el.scrollHeight - el.scrollTop === el.clientHeight) {
            //console.log('scrolled');
            !isAutoScroll && setIsAutoscroll(true)
        } else {
            //console.log('free');
            isAutoScroll && setIsAutoscroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            anchorElementRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [items])

    return <div onScroll={scrollHandler} className={style.messages}>
        {items.map(item => <Message key={item.uniqId} item={item} />)}
        <div ref={anchorElementRef}></div>
    </div>
}

type MessagePropsType = {
    item: ItemResponseType & { uniqId: string }
}

export const Message: React.FC<MessagePropsType> = ({ item }) => {
    return <div className={style.message}>
        <div className={style.userPhoto}>
            <img src={item.photo || photoPlaceholder} alt="photo" />
        </div>
        <div>
            <div className={style.userName}>
                {item.userName}
            </div>
            <div className={style.messageText}>
                {item.message}
            </div>
        </div>

    </div>
}

export const AddNewMessageFrom = () => {
    const dispatch: DispatchThunkType = useDispatch()
    const [message, setMessage] = useState('')
    const statusWS = useSelector(selectorGetChatStatusWS)
    //console.log(statusWS);


    const sendMessageCallback = () => {
        if (!message) return

        dispatch(sendMessage(message))
        setMessage('')
    }

    const keySendHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code == 'Enter' && e.shiftKey) {
            e.preventDefault()
            sendMessageCallback()
        }
    }

    return <div className={style.messageForm}>
        <div>
            <textarea onKeyDown={keySendHandler} onChange={(e) => setMessage(e.currentTarget.value)}
                placeholder='Enter your message'
                value={message}
                className={style.messageTextarea}></textarea>
        </div>
        <button onClick={sendMessageCallback} disabled={statusWS !== 'ready'} className={globalStyle.btn}>Send</button>
    </div>
}