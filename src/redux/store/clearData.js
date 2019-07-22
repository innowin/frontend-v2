import client from '../../consts/client'

const clearData = (version) => {
  if (!localStorage.getItem(version)) {
    client.clearData()
    window.localStorage && localStorage.setItem(version, true)
    window.location.reload()
  }
}

export default clearData
