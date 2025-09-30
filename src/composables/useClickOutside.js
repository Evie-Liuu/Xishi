import { onMounted, onBeforeUnmount } from 'vue';

/**
 * A composable that detects clicks outside of a given element.
 * @param {import('vue').Ref<HTMLElement | null>} elementRef - The ref of the element to monitor.
 * @param {() => void} callback - The function to call when a click outside is detected.
 */
export function useClickOutside(elementRef, callback) {
    const handleClick = (event) => {
        if (elementRef.value && !elementRef.value.contains(event.target)) {
            callback();
        }
    };

    onMounted(() => document.addEventListener('mousedown', handleClick));
    onBeforeUnmount(() => document.removeEventListener('mousedown', handleClick));
}