import React, { useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { useCustomContext } from '@/common/context'

export let showMessage = () => {}

export const CreateMessageObj = () => {
  const [{ message = {} }, setCon] = useCustomContext()
  showMessage = ({ message, open = true }) => {
    setCon({
      message: {
        open,
        msg: message,
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

  return <Snackbar open={open}
                   message={`${msg}`}
                   autoHideDuration={1000}
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
