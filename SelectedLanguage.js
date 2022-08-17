const MAX_DISPLAY_COUNT = 5

export default function SelectedLanguages ({
    $target,
    initialState
}) {
    this.$element = document.createElement('div')
    this.$element.className = 'SelectedLanguage'
    this.state = initialState //전달받은 기본 init으로 설정

    $target.appendChild(this.$element)

    this.setState = (nextState) => { //상태 바꾸기
        this.state = nextState //전달 받은 상태로 바꾸고

        if (this.state.lenght > MAX_DISPLAY_COUNT) {
            const startPosition = this.state.lenght - MAX_DISPLAY_COUNT
            this.state = this.state.slice(startPosition, MAX_DISPLAY_COUNT + startPosition)
        }
        this.render() //재 렌더링
    }

    this.render = () => {
        this.$element.innerHTML = `
            <ul>
                ${this.state.map((item) => `
                    <li>${item}</li>
                `).join('')}
            </ul>
        `
    }

    this.render()
}

