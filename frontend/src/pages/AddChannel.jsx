import { useState } from "react";
import "../styles/add-channel.css";
import axios from 'axios';

function AddChannel() {
    const [channelName, setChannelName] = useState("");

    const handleChannelNameChange = (event) => {
        setChannelName(event.target.value);
        console.log(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(channelName);
        axios.get('http://localhost:8080/');
    };

    return (
        <div>
            <div className="search-channel-box">
                <h1>Search for Channel</h1>
                <form className="channel-form" onSubmit={handleFormSubmit}>
                    <label className='channel-form-label' htmlFor="channelName">Channel Name:</label>
                    <input type="text" value={channelName} onChange={handleChannelNameChange} />
                    <button type='submit'>Search</button>
                </form>
            </div>
            <div>

            </div>
        </div>
    );
}

export default AddChannel;