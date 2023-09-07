import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(timestamp: number): string {
    const now: Date = new Date();
    const time: Date = new Date(timestamp);

    const timeDifference: number = now.getTime() - time.getTime();

    const minute: number = 60 * 1000;
    const hour: number = minute * 60;
    const day: number = hour * 24;
    const year: number = day * 365;

    if (timeDifference < minute) {
      return Math.floor(timeDifference / 1000) + ' seconds ago';
    } else if (timeDifference < hour) {
      return Math.floor(timeDifference / minute) + ' minutes ago';
    } else if (timeDifference < day) {
      return Math.floor(timeDifference / hour) + ' hours ago';
    } else if (timeDifference < year) {
      return Math.floor(timeDifference / day) + ' days ago';
    } else {
      return Math.floor(timeDifference / year) + ' years ago';
    }
  }
}
