import { useEffect, useState, useRef } from "react";
import "../../assets/base.css";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const highlightsRef = useRef([]);

  useEffect(() => {
    clearHighlights();

    if (searchTerm.trim() !== "") {
      const regex = new RegExp(searchTerm, "gi");

      // 🎯 GIỚI HẠN VÙNG TÌM KIẾM
      const root = document.querySelector(".main-content") || document.body;

      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const parent = node.parentNode;
            // Bỏ qua node không hiển thị hoặc trong các thẻ không cần thiết
            const style = window.getComputedStyle(parent);
            const isHidden = style.display === "none" || style.visibility === "hidden";
            const ignoredTags = ["SCRIPT", "STYLE", "NOSCRIPT"];

            if (isHidden || ignoredTags.includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          },
        },
        false
      );

      const highlights = [];

      while (walker.nextNode()) {
        const node = walker.currentNode;
        const matches = [...node.textContent.matchAll(regex)];

        if (matches.length > 0) {
          const parent = node.parentNode;
          const fragment = document.createDocumentFragment();
          let lastIndex = 0;

          matches.forEach((match) => {
            const before = node.textContent.slice(lastIndex, match.index);
            const matchedText = match[0];
            if (before) fragment.appendChild(document.createTextNode(before));

            const span = document.createElement("span");
            span.className = "highlighted-search";
            span.textContent = matchedText;
            fragment.appendChild(span);
            highlights.push(span);

            lastIndex = match.index + matchedText.length;
          });

          const after = node.textContent.slice(lastIndex);
          if (after) fragment.appendChild(document.createTextNode(after));

          parent.replaceChild(fragment, node);
        }
      }

      highlightsRef.current = highlights;
      if (highlights.length > 0) {
        scrollToHighlight(0);
      }
    }
  }, [searchTerm]);

  const scrollToHighlight = (index) => {
    if (highlightsRef.current.length === 0) return;
    const highlight = highlightsRef.current[index];
    highlight.scrollIntoView({ behavior: "smooth", block: "center" });
    highlightsRef.current.forEach((el, i) =>
      el.classList.toggle("active-highlight", i === index)
    );
    setCurrentIndex(index);
  };

  const clearHighlights = () => {
    highlightsRef.current.forEach((el) => {
      const textNode = document.createTextNode(el.textContent);
      el.parentNode.replaceChild(textNode, el);
    });
    highlightsRef.current = [];
  };

  const goNext = () => {
    if (highlightsRef.current.length === 0) return;
    const nextIndex = (currentIndex + 1) % highlightsRef.current.length;
    scrollToHighlight(nextIndex);
  };

  const goPrev = () => {
    if (highlightsRef.current.length === 0) return;
    const prevIndex =
      (currentIndex - 1 + highlightsRef.current.length) %
      highlightsRef.current.length;
    scrollToHighlight(prevIndex);
  };

  return (
    <header>
      <div className="menu-toggle">
        <label htmlFor="navbar-toggle">
          <span className="las la-bars"></span>
        </label>
      </div>

      <div className="search">
        <input
          type="search"
          placeholder="Muốn tìm gì nào?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="las la-search"></span>
        {highlightsRef.current.length > 0 && (
          <>
            <button onClick={goPrev}>⬅️</button>
            <button onClick={goNext}>➡️</button>
          </>
        )}
      </div>

      <div className="header-icons"></div>
    </header>
  );
}

export default Header;
