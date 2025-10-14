import { useEffect } from "react";
import videoTransfer from "../const/video-transfer";
import { useParams, useSearchParams } from "react-router";

export default function RedirectorPage() {
    const { videoId } = useParams();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!videoId) {
            document.body.innerHTML = 'Redirecting to vidcash.cc';
            window.location.replace('https://vidcash.cc');
            return;
        }

        localStorage.setItem(videoTransfer.videoIdKey, videoId);
        localStorage.setItem(videoTransfer.videoOpenTimestamp, Date.now().toString());
        localStorage.setItem(videoTransfer.videoViaKey, searchParams.get('v') || '1');

        if (window.location.hostname.startsWith('localhost')) {
            window.location.href = `/`;
            return;
        }

        // wait for google indexing
        // window.location.href = 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https%3A%2F%2Fvidey.in&ved=2ahUKEwiWlMWNnOGPAxWfUGcHHZgOFZwQFnoECBcQAQ&usg=AOvVaw3dno9XhZ65qWUkagsMzSWF';
        window.location.href = '/';
    }, []);

    return (
        <div>Please wait...</div>
    );
}