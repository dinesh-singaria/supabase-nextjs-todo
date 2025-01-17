import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Notifications({ userId }: { userId: string }) {
  const supabase = useSupabaseClient();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Fetch existing notifications for the user
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("recipient_id", userId)
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching notifications:", error);
      else setNotifications(data);
    };

    fetchNotifications();

    // Subscribe to realtime notifications
    const subscription = supabase
      .channel("public:notifications")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications" },
        (payload) => {
          if (
            (payload.new as { recipient_id: string }).recipient_id === userId
          ) {
            setNotifications((prev) => [payload.new, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [supabase, userId]);

  return (
    <div>
      
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            {notification.message} -{" "}
            {new Date(notification.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
