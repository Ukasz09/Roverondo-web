export class Utils {
  public static getIconPath(iconName: string): string {
    return `/assets/icons/${iconName}`;
  }

  public static getImagePath(imageName: string): string {
    return `/assets/images/${imageName}`;
  }

  public static calcDeltaTime(startDate: Date, endDate: Date): { hour: number, minute: number } {
    const diff = endDate.getTime() - startDate.getTime();
    const days = Math.floor(diff / (60 * 60 * 24 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    const minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    return { hour: hours, minute: minutes };
  }

  public static getInitialsImage(name: string): string {
    return `https://avatars.dicebear.com/api/initials/${name}.svg`;
  }
}
