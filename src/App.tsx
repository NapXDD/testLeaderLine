import { useEffect, useState, DragEvent, MouseEvent } from "react";
import "./App.css";

function App() {
  const [isRender, setIsRender] = useState(false);
  const [startElement, setStartElement] = useState<HTMLElement>();
  // const [endElement, setEndElement] = useState<HTMLElement>();
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isMouseUp, setIsMouseUp] = useState<boolean>(true);

  const handleDrag = () => {
    console.log("hi mom");
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const element = document.getElementById((e.target as Element).id);

    if (element) {
      setStartElement(element);
    }

    setIsMouseDown(true);
    setIsMouseUp(false);

    document.onmouseup = () => {
      setIsMouseDown(false);
      setIsMouseUp(true);
    };
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    const img = new Image();
    img.src = "assets/plus.png";
    e.dataTransfer?.setDragImage(img, 100, 100);
  };

  const handleDrop = () => {
    console.log("Hi mom im dropping");
  };

  useEffect(() => {
    let mouseCordinate = {
      x: 0,
      y: 0,
    };
    if (isMouseDown) {
      document.onmousemove = (e) => {
        console.log("first");
        mouseCordinate = {
          x: e.clientX,
          y: e.clientY,
        };
        const startElementCordinate = startElement?.getBoundingClientRect();
        const lineElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );

        if (startElementCordinate) {
          lineElement.setAttribute("x1", startElementCordinate.x.toString());
          lineElement.setAttribute("y1", startElementCordinate.y.toString());
          lineElement.setAttribute("x2", mouseCordinate.x.toString());
          lineElement.setAttribute("y2", mouseCordinate.y.toString());
          lineElement.setAttribute("stroke", "green");
          lineElement.setAttribute("stroke-width", "1");
        }

        const svgElement = document.getElementById("mySvg");
        if (svgElement) {
          svgElement.innerHTML = "";
          svgElement.appendChild(lineElement);
        }
      };
    } else if (isMouseUp) {
      document.onmousemove = null;
    }
  }, [isMouseDown, isMouseUp, startElement]);

  useEffect(() => {
    setIsRender(true);
    if (isRender) {
      const svg = document.getElementsByClassName("leader-line");

      for (const [key, Element] of Object.entries(svg)) {
        Element.addEventListener("click", () => {
          console.log(key);
        });
      }

      // const scrollableBox = document.querySelector(".scrollAbleBox");
      // if (scrollableBox !== null) {
      //   scrollableBox.addEventListener(
      //     "scroll",
      //     () => {
      //       line1.position();
      //       line2.position();
      //     },
      //     false
      //   );
      // }
    }
  }, [isRender]);

  return (
    <div style={{ userSelect: "none" }}>
      <div
        className="start-line-1"
        id="start"
        draggable
        onMouseDown={handleMouseDown}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
      ></div>

      {/* <div className="start-line-2" id="start">
        line 2
      </div> */}

      <div className="scrollAbleBox">
        <div>
          <div
            className="end-line-1"
            id="end"
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
          ></div>

          {/* <div className="end-line-2" id="end">
            line 2
          </div> */}
        </div>
      </div>
      <svg
        id="mySvg"
        width="100vw"
        height="100vh"
        xmlns="http://www.w3.org/2000/svg"
      ></svg>
    </div>
  );
}

export default App;
