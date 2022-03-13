/**
 * LightBox Modal Component for Image Preview
 */

import { useEffect, useState } from 'react'
import './imagePreview.css'

export default function ShowModal({ path, popimage, callback }) {
  const [image, setImage] = useState(false)

  useEffect(() => {
    setImage(popimage)
  }, [popimage])

  function closeModal() {
    setImage(!image)
    callback('')
  }

  return (
    <>
      <div className={`modal ${image && 'show'}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <p>
                <img src={path}></img>
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="modalButton"
                onClick={closeModal}
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
