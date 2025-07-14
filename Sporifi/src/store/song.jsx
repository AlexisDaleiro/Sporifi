import usePlayerStore from "../store/zustand";

function TrackList() {
  const { musicList, setTrack } = usePlayerStore();

  return (
    <div>
      {musicList.map((track, i) => (
        <button key={i} onClick={() => setTrack(track)}>
          {track.title} - {track.artist}
        </button>
      ))}
    </div>
  );
}
export default TrackList;
