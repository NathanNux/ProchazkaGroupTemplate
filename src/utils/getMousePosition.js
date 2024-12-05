export default function getMousePosition({positionX, positionY, ref}) {

    const manageMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { width, height } = ref.current.getBoundingClientRect();

        if(width && height){
            positionX.set(clientX - width / 2);
            positionY.set(clientY - height / 2);
        }
    }

    return manageMouseMove
}