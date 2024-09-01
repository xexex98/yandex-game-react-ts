export function notifications(title: string, options?: NotificationOptions) {
  if (typeof Notification !== 'undefined') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification(title, options);
      }
    });
  }
}

export function ErrorNotifications(errorText: string) {
  notifications('Ошибка', { body: errorText });
}
