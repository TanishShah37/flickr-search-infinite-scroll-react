/**
 * Search Component with Debouncing
 */

import { useState } from 'react'
import useLocalStorage from '../../common/hooks/useLocalStorage'
import './Search.css'

export default function Search({ parentCallback }) {
  const [search, setSearch] = useState('')
  const [suggestionsData, setSuggestionsData] = useState([])
  const [inputVal, setInputVal] = useState('')
  const [suggestions, setSuggestions] = useLocalStorage('suggestions', [])

  /**
   * Debouncing when enter key is pressed in search bar.
   */

  function debounce() {
    let timer;

    function fn() {
      clearTimeout(timer)
      timer = setTimeout(() => {
        inputVal && setSuggestions([...suggestions, inputVal])
        updatePhotos()
      }, 500)
    }
    return fn
  }

  function updatePhotos() {
    setSearch((search) => search + 1)
    parentCallback(search)
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search Flickr (Press Enter to Search or Click on Suggestions if you have searched previously)"
        id="searchBar"
        onFocus={() => {
          setSuggestionsData(suggestions)
        }}
        onClick={() => {
          setSuggestionsData(suggestions)
        }}
        onMouseOver={() => {
          setSuggestionsData(suggestions)
        }}
        onMouseOut={() => {
          // setSuggestionsData(suggestions)
          setSuggestionsData([])
        }}
        // onBlur={() => {
        //   setSuggestionsData([])
        // }}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyPress={(event) => {
          return event.key === 'Enter' && debounce()()
        }}
      />

      <div
        id="myDropdown"
        className={`dropdown-content
          ${suggestionsData.length > 0 && 'show'}
        `}
      >
        {suggestionsData?.length > 0 &&
          suggestionsData?.map((item, index) => {
            return (
              <>
                <p
                  onClick={() => {
                    setInputVal(item)
                    debounce()()
                    setSuggestionsData([])
                  }}
                  key={`${index}${item}`}
                >
                  {item}
                </p>
              </>
            )
          })}
      </div>
    </>
  )
}
