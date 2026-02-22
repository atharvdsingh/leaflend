"use client";
import React, { useEffect, useState } from "react";
import AllPublicRoomCard from "./AllPublicRoomCard";
import type { roomTypeForCardWithName } from "@/types/databaseRoutesType";
import { fetchPublicRooms } from "@/actions/fetchAvailableRoomDetails";
import { useInView } from "react-intersection-observer";
import AllPublicRoomCardSkeleton from "./SkeletonAllPublicRoomCard";
import CenterComponent from "@/components/CenterComponent";
import NoBooks from "@/components/Home/NoBooks";
import { House } from "lucide-react";
interface Props {
  rooms: roomTypeForCardWithName[];
  userId: number;
}
const NUMBER_OF_USERS_TO_FETCH = 5;

function PublickRoomWrapper(props: Props) {
  const [rooms, setRoom] = useState<roomTypeForCardWithName[]>(
    props.rooms.filter(
      (room) =>
        !room.members.some((member) => member.memberId === props.userId),
    ),
  );
  const [loading, setLoadig] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(8);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { ref, inView } = useInView();

  const loadMOreData = async () => {
    if (!hasMore || loading) return;
    setLoadig(true);

    const newrooms = await fetchPublicRooms(offset, NUMBER_OF_USERS_TO_FETCH);

    if (newrooms.length === 0) {
      setHasMore(false);
      setLoadig(false);
      return;
    }

    const filterrooms = newrooms.filter(
      (room) =>
        !room.members.some((member: any) => member.memberId === props.userId),
    );

    setRoom((rooms) => [...rooms, ...filterrooms]);
    setOffset((offset) => offset + NUMBER_OF_USERS_TO_FETCH);

    if (newrooms.length < NUMBER_OF_USERS_TO_FETCH) {
      setHasMore(false);
    }

    setLoadig(false);
  };

  useEffect(() => {
    if (inView && !loading && hasMore) {
      loadMOreData();
    }
  }, [inView, loading, hasMore]);
  if (rooms.length == 0) {
    return (
      <div className="flex justify-center min-h-[60vh] items-center">
        <div className="flex justify-center flex-col gap-3 items-center">
          <House className="opacity-50 scale-200" />
          <p className="opacity-50">No Rooms Available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-3 pt-20 mx-4 flex-col ">
        {rooms.map((room) => (
          <AllPublicRoomCard key={room.id} room={room} />
        ))}
      </div>
      <div className="flex gap-3 mt-3 mx-4 flex-col">
        {loading &&
          Array.from({ length: 5 }).map((_, key) => (
            <AllPublicRoomCardSkeleton key={key} />
          ))}
      </div>
      {hasMore && <div ref={ref} className="h-10"></div>}
    </>
  );
}

export default PublickRoomWrapper;
