import React, { useEffect, useState } from 'react'
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import { useCustomContext } from '@/common/context'
import { wrapperTheme } from "@/common/theme";
import { createMuiTheme } from "@material-ui/core";
import { CusButton } from "@/component/CusButton";

const _themeOption = createMuiTheme({
  palette: {
    type: 'light',
  },
})
export let showConfirm: showConfirm = () => {
}

export const ConfirmDialog = () => {
  const [loading, setLoading] = useState(0)
  const [context, setContext] = useCustomContext()
  showConfirm = (option) => {
    setContext({
      confirm: {
        ...option,
        ...{ title: '', open: true }
      }
    })
  }
  useEffect(() => {
    setContext({
      confirm: {
        open: false,
        title: '',
        message: '',
      },
      showConfirm: (option: {}) => {
        setContext({
          confirm: {
            ...option,
            ...{ title: '', open: true }
          }
        })
      },
    })
  }, [setContext])

  const handleClose = () => {
    setContext({
      confirm: {
        open: false
      }
    })
  }
  const { message, title, open, callBack, oneButton } = context.confirm || {}
  return wrapperTheme(_themeOption)(
      !context.confirm ? <div/> :
          <Dialog
              open={open}
              onClose={handleClose}
          >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <CusButton
                  loading={loading}
                  onClick={async () => {
                    setLoading(1)
                    callBack && await callBack(0)
                        .finally(() => setLoading(0))
                    setLoading(0)
                    handleClose()
                  }}
                  color="primary">
                {oneButton ? '关闭': '取消'}
              </CusButton>
              {
                !oneButton &&
                <CusButton
                    loading={loading}
                    onClick={async () => {
                      setLoading(1)
                      callBack && await callBack(1)
                          .finally(() => setLoading(0))
                      setLoading(0)
                      handleClose()
                    }}
                    color="primary"
                >
                  确定
                </CusButton>
              }
            </DialogActions>
          </Dialog>
  )
}
