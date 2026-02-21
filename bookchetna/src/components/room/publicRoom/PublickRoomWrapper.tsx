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
  const { ref, inView } = useInView();
  const loadMOreData = async () => {
    setLoadig(true);

    const newrooms = await fetchPublicRooms(offset, NUMBER_OF_USERS_TO_FETCH);
    const filterrooms = newrooms.filter(
      (rooms) =>
        !rooms.members.some((member: any) => member.memberId === props.userId),
    );

    if (newrooms.length === 0) {
      return (
        <CenterComponent>
          <div className="text-foreground">hi there</div>
        </CenterComponent>
      );
    }

    setRoom((rooms) => [...rooms, ...filterrooms]);
    setOffset((offset) => offset + NUMBER_OF_USERS_TO_FETCH);
    setLoadig(false);
  };
  useEffect(() => {
    if (inView && !loading) {
      loadMOreData();
    }
  }, [inView]);
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
      <div className="flex gap-3 mt-20 mx-4 flex-col ">
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
      <div ref={ref}></div>
    </>
  );
}

export default PublickRoomWrapper;
