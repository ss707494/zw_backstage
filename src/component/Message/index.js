import React, { useEffect } from 'react'
import { useCustomContext } from '@/common/context'
import { S } from './style'

export let showMessage = ({ message, open = true, duration = 1000 }) => {
}

export const CreateMessageObj = () => {
  const [{ message = {} }, setCon] = useCustomContext()
  showMessage = ({ message, open = true, duration = 1000, msgType }) => {
    setCon({
      message: {
        open,
        msg: message,
        duration,
        msgType
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
      msgType={message.msgType}
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
