import React, { useEffect } from 'react'
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import { useCustomContext } from '@/common/context'

export const ConfirmDialog = () => {
  const [context, setContext] = useCustomContext()
  // const showConfirm = (option) => {
  //   setContext({
  //     confirm: {
  //       ...option,
  //       ...{ title: '', open: true }
  //     }
  //   })
  // }
  useEffect(() => {
    setContext({
      confirm: {
        open: false,
        title: '',
        message: '',
      },
      showConfirm: (option) => {
        setContext({
          confirm: {
            ...option,
            ...{ title: '', open: true }
          }
        })
      },
    })
  }, [])

  const handleClose = () => {
    setContext({
      confirm: {
        open: false
      }
    })
  }
  const { message, title, open, callBack } = context.confirm || {}
  return (
      !context.confirm ? <div/> :
          <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={async () => {
                callBack && await callBack(0)
                handleClose()
              }}
                      color="primary">
                Disagree
              </Button>
              <Button onClick={async () => {
                callBack && await callBack(1)
                handleClose()
              }}
                      color="primary"
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
  )
}
