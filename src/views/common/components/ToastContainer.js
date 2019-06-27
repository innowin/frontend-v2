// @flow
import * as React from 'react'
import * as PropTypes from 'prop-types'
import Toast from './Toast'
// import constants from "src/consts/constants";
import connect from 'react-redux/es/connect/connect'
import {bindActionCreators} from 'redux'
import ToastActions from 'src/redux/actions/toastActions'
import getToastSelector from 'src/redux/selectors/toast/getToastSelector'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

type ToastProps = {
  actions: {
    addToast: Function,
    removeToast: Function,
  },
  toasts: [],
}

const ToastContainer = (props: ToastProps) => {

  // const createToast = () => {
  //   const {actions} = props
  //   const {addToast} = actions
  //   // addToast({data: {id: 1, type: constants.TOAST_TYPE.SUCCESS, content: {text: 'آورده شما با موفقت ثبت شد'}}})
  //   // addToast({
  //   //   data: {
  //   //     id: 2,
  //   //     type: constants.TOAST_TYPE.INFO,
  //   //     content: {text: 'می توانید اولویت نمایش آورده ها را تغییر دهید. برای ویرایش هر آورده به پروفایل آورده مراجعه کنید.'}
  //   //   }
  //   // })
  //   // addToast({data: {id: 3, type: constants.TOAST_TYPE.ERROR, content: {text: 'شما مجاز به انجام این کار نیستید.'}}})
  //   addToast({data: {id: 4, type: constants.TOAST_TYPE.WARNING, content: {text: 'پست شما پاک شد.'}}})
  // }

  const deleteToast = (toastId) => {
    const {actions} = props
    const {removeToast} = actions
    removeToast({id: toastId})
  }

  const {toasts} = props
  return (
      <div className='toast-container'>
        {/*<button onClick={createToast}>تست تست</button>*/}
        <TransitionGroup>
          {toasts.map(toast =>
              <CSSTransition key={toast.id} timeout={400} classNames='test'>
                <Toast toast={toast} removeToast={() => deleteToast(toast.id)}/>
              </CSSTransition>
          )}
        </TransitionGroup>
      </div>
  )
}

ToastContainer.propTypes = {
  toasts: PropTypes.array,
}

const mapStateToProps = (state) => {
  return {
    toasts: getToastSelector(state)
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    removeToast: ToastActions.removeToast,
    addToast: ToastActions.addToast,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ToastContainer)