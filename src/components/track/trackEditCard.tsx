import { Card } from "antd";
import React from "react";
import { ITimedRace } from "../../stores/race/types";
import { ITrack, TrackState } from "../../stores/track/types";
import TrackDetails from "./trackDetails";
import TrackSelect from "./trackSelect";

interface IStateProps {
  tracks: TrackState;
  raceData: ITimedRace;
}
interface IDispatchProps {
  setTrack: (id: number) => void;
  updateTrack: (data: ITrack) => void;
}

type MyProps = IStateProps & IDispatchProps;

const TrackEditCard: React.FC<MyProps> = (props: MyProps) => {
  const data = { tracks: props.tracks.allTracks, current: props.raceData.track, selectTrack: props.setTrack };
  const trackData = { data: props.raceData.track, updateTrackData: props.updateTrack };
  return (
    <>
      <Card title="Track details" size="small" extra={<TrackSelect {...data} />}>
        <TrackDetails {...trackData} />
      </Card>
    </>
  );
};

export default TrackEditCard;
