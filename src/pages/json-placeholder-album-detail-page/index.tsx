import { useParams } from "react-router-dom";

export type AlbumParamsType = {
  userId: string | undefined;
  albumId: string | undefined;
};

export default function JsonPlaceholderAlbumDetailPage() {
  const params = useParams<AlbumParamsType>();

  // üç tane request atmamız lazım. user bilgisi, albüm bilgisi, albüm fotoğrafları.

  return (
    <>
      <div className="p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal">Album Detail</h1>
      </div>
    </>
  );
}