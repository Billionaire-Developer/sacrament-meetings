
import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-11-08',
    meetingType: 'regular',
    presiding: 'Bishop James',
    conducting: 'Brother David',
    announcements: ['Ward conference preparation.'],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: 'In Remembrance of Thy Suffering',
    },
    speakers: [
      {
        name: 'Brother John',
        topic: 'Building Faith in Jesus Christ',
        type: 'speaker',
      },
      {
        name: 'Sister Grace',
        topic: 'Following the Savior',
        type: 'speaker',
      },
    ],
    closingHymn: {
      number: 31,
      title: 'O God, Our Help in Ages Past',
    },
    closingPrayer: 'Brother Michael',
  },
  {
    id: 2,
    date: '2026-11-01',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    announcements: ['Ward temple night: November 10'],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [
      { description: 'Sustaining of new Primary president' },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: 'In Remembrance of Thy Suffering',
    },
    speakers: [
      {
        name: 'Sister Brown',
        topic: 'Faith in Jesus Christ',
        type: 'speaker',
      },
      {
        name: 'Youth Choir',
        topic: '',
        type: 'musical-number',
      },
    ],
    closingHymn: {
      number: 31,
      title: 'O God, Our Help in Ages Past',
    },
    closingPrayer: 'Brother Davis',
  },
  {
    id: 3,
    date: '2026-10-25',
    meetingType: 'testimony',
    presiding: 'Bishop James',
    conducting: 'Brother Peter',
    openingHymn: {
      number: 19,
      title: 'We Thank Thee, O God, for a Prophet',
    },
    openingPrayer: 'Sister Mary',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 181,
      title: 'Jesus of Nazareth, Savior and King',
    },
    speakers: [],
    closingHymn: {
      number: 85,
      title: 'How Firm a Foundation',
    },
    closingPrayer: 'Brother Samuel',
  },
  {
    id: 4,
    date: '2026-10-18',
    meetingType: 'regular',
    presiding: 'Bishop James',
    conducting: 'Brother David',
    openingHymn: {
      number: 27,
      title: 'Praise to the Man',
    },
    openingPrayer: 'Brother Daniel',
    wardBusiness: [
      { description: 'Announcement of upcoming ward conference.' },
    ],
    stakeBusiness: true,
    sacramentHymn: {
      number: 185,
      title: 'Reverently and Meekly Now',
    },
    speakers: [
      {
        name: 'Sister Anna',
        topic: 'Service and Discipleship',
        type: 'speaker',
      },
    ],
    closingHymn: {
      number: 98,
      title: 'I Need Thee Every Hour',
    },
    closingPrayer: 'Sister Ruth',
  },
  {
    id: 5,
    date: '2026-10-11',
    meetingType: 'stake',
    presiding: 'Stake President Brown',
    conducting: 'Brother Joseph',
    openingHymn: {
      number: 1,
      title: 'The Morning Breaks',
    },
    openingPrayer: 'Brother Mark',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 193,
      title: 'I Stand All Amazed',
    },
    speakers: [
      {
        name: 'Stake Choir',
        topic: 'Musical Presentation',
        type: 'musical-number',
      },
    ],
    closingHymn: {
      number: 44,
      title: 'Beautiful Zion, Built Above',
    },
    closingPrayer: 'Sister Esther',
  },
  {
    id: 6,
    date: '2026-10-04',
    meetingType: 'general',
    presiding: 'Stake President Brown',
    conducting: 'Brother Joseph',
    openingHymn: {
      number: 3,
      title: 'Now Let Us Rejoice',
    },
    openingPrayer: 'Brother Mark',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 188,
      title: 'Thy Will, O Lord, Be Done',
    },
    speakers: [
      {
        name: 'Brother Thomas',
        topic: 'Following the Savior',
        type: 'speaker',
      },
    ],
    closingHymn: {
      number: 30,
      title: 'Come, Come, Ye Saints',
    },
    closingPrayer: 'Sister Esther',
  },
];

export function getMeetings(
  date?: string | null
): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(
  id: number
): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}
