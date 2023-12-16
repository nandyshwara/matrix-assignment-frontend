import { InfinitySpin } from "react-loader-spinner";

export default function Loading({ className }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
      className={className}
    >
      <InfinitySpin width={140} color="#392467" />
    </div>
  );
}
