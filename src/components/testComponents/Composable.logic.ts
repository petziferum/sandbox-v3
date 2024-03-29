import { ref, onMounted, onUnmounted } from 'vue'

export const text = ref('Sample Text')
// by convention, composable function names start with "use"
export function useMouse() {
    // state encapsulated and managed by the composable
    const x = ref(0)
    const y = ref(0)

    // a composable can update its managed state over time.
    function update(event) {
        x.value = event.pageX
        y.value = event.pageY
    }

    // a composable can also hook into its owner component's
    // lifecycle to setup and teardown side effects.
    onMounted(() => window.addEventListener('mousemove', update))
    onUnmounted(() => window.removeEventListener('mousemove', update))

    // expose managed state as return value
    return { x, y }
}

export function addText(): void {
    resetText();
    text.value = text.value + ' added Hello World!';
}

export function resetText(): void {
    text.value = 'Sample Text';
}
