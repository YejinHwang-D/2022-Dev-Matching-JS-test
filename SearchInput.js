export default function SearchInput({
    $target,
    initialState,
    onChange
}) {
    this.$element = document.createElement('form')
    this.$element.className = "SearchInput"
    this.state = initialState
    $target.appendChild(this.$element)

    this.render = () => {
        this.$element.innerHTML =
        `
        <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value="${this.state}" autofocus></input>
        `
    }
    this.render()

    // 이벤트 핸들러 구현
    this.$element.addEventListener('keyup', (e) => {
        const actionIgnoreKeys = ['Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
        
        if (!actionIgnoreKeys.includes(e.key)) {
            // 입력된 키가 방향키 + 엔터가 아니면
            onChange(e.target.value)
        }
    })

    this.$element.addEventListener('submit', (e) => {
        e.preventDefault()
    })
}