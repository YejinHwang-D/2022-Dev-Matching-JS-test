import SearchInput from './SearchInput.js'
import Suggestion from './Suggestion.js'
import SelectedLanguages from './SelectedLanguage.js'

import { fetchedLanguages } from './api.js'

export default function App({ $target }) {
    this.state = {
        fetchedLanguages: [],
        keyword: '',
        selectedLanguages: [],
        lastInput: '',
        lastSelectedIndex: 0
    }
    
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        suggestion.setState({
            selectedIndex: this.state.lastSelectedIndex,
            items: this.state.fetchedLanguages,
            keyword: this.state.keyword
        })
        selectedLanguages.setState(this.state.selectedLanguages)

        console.log(this.state)
        window.localStorage.setItem('lastState', JSON.stringify(this.state))
        console.log(JSON.parse(window.localStorage.getItem('lastState')).lastInput)
    }

    const selectedLanguages = new SelectedLanguages({
        $target,
        initialState: []
    })

    const searchInput = new SearchInput({
        $target,
        initialState: '',
        onChange: async (keyword) => {
            if (keyword.length === 0) {
                this.setState({
                    fetchedLanguages: [],
                    lastInput: '',
                    keyword: ''
                })
            } else {
                const languages = await fetchedLanguages(keyword)
                setTimeout(()=>{
                    this.setState({
                        fetchedLanguages: languages,
                        lastInput: keyword,
                        keyword: keyword
                    })
                }, 300)
            }
        }
    })

    const suggestion = new Suggestion({
        $target,
        initialState: {
            selectedIndex: this.state.lastSelectedIndex,
            items: []
        },
        onSelect: (language) => {
            alert(language)

            const nextSelectedLanguages = [...this.state.selectedLanguages]
            const index = nextSelectedLanguages.findIndex(
                (selectedLanguages) => selectedLanguages === language
                )
            if (index > -1 ) {
                nextSelectedLanguages.splice(index, 1) //if array has same word, remove
            }
            nextSelectedLanguages.push(language)

            this.setState({
                ...this.state,
                selectedLanguages: nextSelectedLanguages
            })
        }
    })

    // 만약 로컬스토리지에 값이 있을 경우
    if (window.localStorage.getItem('lastState') !== null) {
        const cacheData = JSON.parse(window.localStorage.getItem('lastState'))
        this.setState ({
            selectedLanguages: cacheData.selectedLanguages,
            lastInput: cacheData.lastInput,
            lastSelectedIndex: cacheData.lastSelectedIndex
        })
    }
}