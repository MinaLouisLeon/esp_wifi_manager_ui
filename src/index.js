import "./style";
import { useState, useEffect } from "preact/hooks";
export default function App() {
  const [ssidList, setSsidList] = useState([]);
  useEffect(() => {
    fetch("/ssidList")
      .then((res) => res.text())
      .then((data) => {
        setSsidList(data.split(/\r?\n/));
      });
  }, []);
  const choosedSSID = (ssid) => {
    document.getElementById("modal").style.display = "block";
    document.getElementById("ssid").setAttribute("value", ssid);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    document.getElementById("modal").style.display = "none";
  };
  return (
    <div>
      <div className="modal" id="modal">
        <div className="modalContent" id="modalContent">
          <form action="/" method="POST">
            <div className="card-grid">
              <div className="card">
                <label for="ssid">SSID :</label>
                <input type="text" id="ssid" name="ssid" />
                <br />
                <label for="pass">Password :</label>
                <input type="text" id="pass" name="pass" />
                <br />
                <label for="ip">IP Address :</label>
                <input type="text" id="ip" name="ip" value="192.168.1.120" />
                <br />
                <label for="gatway">Gateway Address :</label>
                <input
                  type="text"
                  id="gateway"
                  name="gateway"
                  value="192.168.1.1"
                />
                <br />
                <div className="form-control">
                  <button className="cancel" onClick={(e) => handleCancel(e)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="topNav">
        <h1>M2L Wi-Fi Manager</h1>
      </div>
      <div className="content">
        <div className="card-grid">
          <div className="card">
            <div>
              <ul>
                {ssidList.map((ssid) => {
                  return <li onClick={() => choosedSSID(ssid)}>{ssid}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
