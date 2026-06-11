function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="menu-lateral">
        <button>Nueva conversación</button>
      </div>

      <div className="historial">
        <h3>Historial</h3>

        <ul>
          <li>Chat 1</li>
          <li>Chat 2</li>
          <li>Chat 3</li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;