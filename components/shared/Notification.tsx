import { useState } from "react";
import Image from "next/image";
import notificationsIcon from "/public/notifications.svg";

type WorkoutProgramType = {
  name: string;
  img: string;
};

type NotificationTYPE = {
  message: string;
  workoutProgram: WorkoutProgramType;
  createdAt: string;
};

const Notifications = ({
  notifications,
  totalElements,
  setTotalElements,
}: {
  notifications: NotificationTYPE[];
  totalElements: number;
  setTotalElements: (value: number) => void;
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setTotalElements(0);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="relative rounded-full p-1 text-gray-400 hover:text-white"
        onClick={handleToggleNotifications}
      >
        <Image src={notificationsIcon} alt="Notifications" />
        <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          {totalElements}
        </span>
      </button>
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-2 z-50">
          {notifications.map((notification, index) => (
            <div key={index} className="p-2 border-b">
              <p className="font-bold">{notification.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
              <div className="flex gap-2 mt-2">
                <div key={index} className="flex items-center gap-2">
                  <img
                    className="rounded-full w-10 h-10 object-cover"
                    src={notification.workoutProgram.img}
                    alt={notification.workoutProgram.name}
                  />
                  <span>{notification.workoutProgram.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
