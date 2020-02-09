import React, { useEffect } from 'react'
import { useCustomContext } from '@/common/context'
import { S } from './style'

export let showMessage: ({ message, open: boolean, duration: number}: any) => any = () => {
}

export const CreateMessageObj = () => {
  const [{ message = {} }, setCon] = useCustomContext()
  showMessage = ({ message, open = true, duration = 2000, msg_type }) => {
    setCon({
      message: {
        open,
        msg: message,
        duration,
        msg_type
      }
    })
  }
  useEffect(() => {
    setCon({
      message: {
        open: false,
        msg: '',
      },
      showMessage,
    })
  }, [setCon])
  const { open, msg } = message

  return <S.Snackbar
      // @ts-ignore
      msg_type={message.msg_type}
      open={open}
      message={`${msg}`}
      autoHideDuration={message.duration}
      onClose={() => setCon({
        message: {
          open: false
        }
      })}
  />
}

export default {
  CreateMessageObj,
}
