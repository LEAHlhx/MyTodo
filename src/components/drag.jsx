import React, { useEffect, useRef } from "react"

let startIndex = 0
let canMove = false
export function Drag({ items, setItems, render }) {
    const handleDragStart = (index, e) => {
        startIndex = index
        canMove = true
    }
    async function exchange(items, startIndex, index) {
        const startNode = rootRef.current.children[startIndex];
        const arriveNode = rootRef.current.children[index];
        const l1 = startNode.offsetTop;
        const l2 = arriveNode.offsetTop;
        //添加动画
        await animate([startNode, arriveNode], [l2 - l1, l1 - l2], 500);
        //复位
        startNode.style.transform = `translateY(0px)`;
        arriveNode.style.transform = `translateY(0px)`;
        //交换内容，营造两个元素平移改变位置的效果
        [items[startIndex], items[index]] = [items[index], items[startIndex]]
        setItems([...items])

    }
    function animate(elements, distances, duration) {
        const start = performance.now()
        let isOk = [0, 0]
        return new Promise((resolve) => {
            requestAnimationFrame(function animate(time) {
                elements.forEach((element, index) => {
                    const distance = distances[index];
                    const progress = (time - start) / duration * distance;
                    if (Math.abs(progress) <= Math.abs(distance)) {
                        draw(progress, element)
                    } else {
                        isOk[index] = 1
                    }
                })
                //如果没有移动到相应的位置，需要继续调用动画
                if (isOk.includes(0)) {
                    requestAnimationFrame(animate)
                } else {
                    resolve()
                }
            })
        })
    }
    function draw(progress, element) {
        element.style.transform = `translateY(${progress}px)`;
    }
    //当items改变的时候，重新设置canMove为true
    useEffect(() => {
        canMove = true
    }, [items])
    const handleDragOver = (index, e) => {
        if (startIndex !== index && canMove) {
            exchange(items, startIndex, index)
            startIndex = index
            canMove = false
        }
    }
    const rootRef = useRef(null)
    return (
        <div ref={rootRef}>
            {render.map((item, index) => <div style={{ width: "100%" }} draggable={true} onDragStart={(e) => handleDragStart(index, e)} onDragOver={(e) => handleDragOver(index, e)} className="test ani" key={index}>{item}</div>)}
        </div>
    )
}