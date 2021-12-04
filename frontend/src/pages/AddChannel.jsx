import { useState } from "react";
import "../styles/add-channel.css";
import axios from 'axios';

function AddChannel() {
    const [channelName, setChannelName] = useState("");
    const [resultsExist, setResultsExist] = useState(false);
    const [channelList, setChannelList] = useState([]);

    const handleChannelNameChange = (event) => {
        setChannelName(event.target.value);
        // console.log(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (channelName.length === 0)
            return;
        axios.get('http://localhost:8080/search-channel', { params: { channelName: channelName } })
            .then(result => {
                if (result.data.length > 0) {
                    setResultsExist(true);
                    setChannelList(result.data);
                    console.log(result.data);
                } else {
                    setResultsExist(false);
                }
            }).catch(err => {
                console.log(err);
            });

    };

    const displayResults = () => (
        <div className='section-box'>
            {channelList.map(channelInfo => {
                return <div className='channel'>
                    <h1>{channelInfo.snippet.title}</h1>
                    <img src={channelInfo.snippet.thumbnails.medium.url} alt={channelInfo.snippet.thumbnails.default.url} />
                </div>;
            })}
        </div>
    );

    return (
        <div>
            <div className="section-box">
                <h1>Search for Channel</h1>
                <form className="channel-form" onSubmit={handleFormSubmit}>
                    <label className='channel-form-label' htmlFor="channelName">Channel Name:</label>
                    <input type="text" value={channelName} onChange={handleChannelNameChange} />
                    <button type='submit'>Search</button>
                </form>
            </div>
            {resultsExist ? displayResults() : ''}
        </div>
    );
}

export default AddChannel;