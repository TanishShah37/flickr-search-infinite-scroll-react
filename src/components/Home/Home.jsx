import { useEffect, useState, useRef } from 'react'
import Search from '../Search/Search'
import ShowModal from '../imagePreview/imagePreview'

export default function Home() {
  const API_URL =
    'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=b198091c72f3e597f6b23555d221416b'

  const format = 'json'
  const perPageCount = '10'

  const IMAGE_VIEW_API_URL = 'https://live.staticflickr.com'

  const [list, setList] = useState([])

  let [page, setPage] = useState(0)
  const [popimage, setPopImage] = useState(false)
  let [path, setPath] = useState('')
  const loader = useRef(null)

  /**
   * Infinite Scroll Handling with Intersection Observer API
   */

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    }

    const observer = new IntersectionObserver(handleObserver, options)
    if (loader.current) {
      observer.observe(loader.current)
    }
  }, [])

  const handleObserver = (entities) => {
    const target = entities[0]
    if (target.isIntersecting) {
      setPage((page) => page + 1)
    }
  }

  /**
   * Flickr API Call to get Search results
   */
   useEffect(() => {
    fetch(
      `${API_URL}&per_page=${perPageCount}&page=${page}&format=${format}&nojsoncallback=1`,
    )
      .then((res) => res.json())
      .then((data) => {
        const photos =  data?.photos?.photo;
        photos?.length > 0 && setList(list.concat(data.photos.photo))
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  /**
   *
   * callback function for Search component
   */

  function parentCallback(val) {
    setList([])
    setPage(val)
  }

  function openModal(image) {
    setPath(image)
    setPopImage(!popimage)
  }

  return (
    <>
      <header className="header">
        <label>Flickr Search</label>
        <Search parentCallback={parentCallback}></Search>
      </header>

      <div className="row">
        {list &&
          list.map((items, index) => {
            return (
              <span
                key={index}
                className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              >
                <img
                  alt={index}
                  src={`${IMAGE_VIEW_API_URL}/${items.server}/${items.id}_${items.secret}.jpg`}
                  onClick={() =>
                    openModal(
                      `${IMAGE_VIEW_API_URL}/${items.server}/${items.id}_${items.secret}.jpg`,
                    )
                  }
                ></img>
              </span>
            )
          })}
      </div>

      <div className="loading" ref={loader}>
        <h2>Loading ...</h2>
      </div>

      <ShowModal
        path={path}
        popimage={popimage}
        callback={openModal}
      ></ShowModal>
    </>
  )
}
