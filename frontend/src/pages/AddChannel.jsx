import { useState } from "react";
import "../styles/add-channel.css";
import axios from 'axios';

function AddChannel() {
	const [channelName, setChannelName] = useState("");
	const [channelURL, setChannelURL] = useState("");
	const [resultsExist, setResultsExist] = useState(false);
	const [channelList, setChannelList] = useState([]);



	const handleChannelNameChange = (event) => {
		setChannelName(event.target.value);
	};

	const handleChannelURLChange = (event) => {
		setChannelURL(event.target.value);
	};

	const handleChannelNameForm = (event) => {
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

	const handleChannelURLForm = (event) => {
		event.preventDefault();
		if (channelURL.length === 0)
			return;
		axios.get('http://localhost:8080/get-channel-by-url', { params: { channelURL: channelURL } })
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
					<div>
						<img src={channelInfo.snippet.thumbnails.medium.url} alt={channelInfo.snippet.thumbnails.default.url} />
						<button>Add</button>
					</div>
				</div>;
			})}
		</div>
	);

	return (
		<div>
			<div className="section-box">
				<h1>Search for Channel</h1>
				<div className='forms-box'>
					<form className="channel-form" onSubmit={handleChannelNameForm}>
						<label className='channel-form-label' htmlFor="channelName">By Channel Name:</label>
						<input type="text" value={channelName} onChange={handleChannelNameChange} />
						<button type='submit'>Search</button>
					</form>
					<form className="channel-form" onSubmit={handleChannelURLForm}>
						<label className='channel-form-label' htmlFor="channelName">By Channel URL:</label>
						<input type="text" value={channelURL} onChange={handleChannelURLChange} />
						<button type='submit'>Search</button>
					</form>
				</div>
			</div>
			{resultsExist ? displayResults() : ''}
		</div>
	);
}

export default AddChannel;