const STORAGE_KEY = 'janasewa_grievances';
const USER_KEY = 'janasewa_user';
const UPVOTES_KEY = 'janasewa_upvotes';

const KATHMANDU_WARDS = Array.from({ length: 32 }, (_, i) => `Ward ${i + 1}`);

const CATEGORIES = ['road', 'water', 'electricity', 'garbage', 'drainage', 'other'];

const SEED_DATA = [
  {
    id: '1',
    title: 'Massive pothole on Ring Road near Kalanki',
    description: 'A large pothole has formed on the Ring Road near Kalanki Chowk causing accidents. Multiple vehicles have been damaged. The pothole is about 2 feet deep and spans half the road.',
    category: 'road',
    status: 'in_progress',
    ward: 'Ward 14',
    lat: 27.6933,
    lng: 85.2815,
    photo: null,
    upvotes: 47,
    reportedBy: '+977-9841000001',
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    statusHistory: [
      { status: 'pending', date: Date.now() - 5 * 24 * 60 * 60 * 1000 },
      { status: 'in_progress', date: Date.now() - 2 * 24 * 60 * 60 * 1000 }
    ]
  },
  {
    id: '2',
    title: 'No water supply for 3 days in Baluwatar',
    description: 'Our area has not received any water supply from Kathmandu Upatyaka Khanepani Limited (KUKL) for the past 3 days. The scheduled supply day was missed without any notice.',
    category: 'water',
    status: 'pending',
    ward: 'Ward 4',
    lat: 27.7215,
    lng: 85.3281,
    photo: null,
    upvotes: 32,
    reportedBy: '+977-9841000002',
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    statusHistory: [
      { status: 'pending', date: Date.now() - 1 * 24 * 60 * 60 * 1000 }
    ]
  },
  {
    id: '3',
    title: 'Street lights not working in Lazimpat',
    description: 'All streetlights on the main Lazimpat road from the embassy area to Narayan Gopal Chowk have been non-functional for over a week. Very dangerous at night.',
    category: 'electricity',
    status: 'resolved',
    ward: 'Ward 3',
    lat: 27.7180,
    lng: 85.3215,
    photo: null,
    upvotes: 28,
    reportedBy: '+977-9841000003',
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    statusHistory: [
      { status: 'pending', date: Date.now() - 10 * 24 * 60 * 60 * 1000 },
      { status: 'in_progress', date: Date.now() - 7 * 24 * 60 * 60 * 1000 },
      { status: 'resolved', date: Date.now() - 1 * 24 * 60 * 60 * 1000 }
    ]
  },
  {
    id: '4',
    title: 'Garbage pile-up at Teku junction',
    description: 'Garbage has not been collected for over a week at the Teku junction area. The pile is growing and causing a severe health hazard. Strong odor is affecting nearby residents and businesses.',
    category: 'garbage',
    status: 'pending',
    ward: 'Ward 12',
    lat: 27.6960,
    lng: 85.3050,
    photo: null,
    upvotes: 56,
    reportedBy: '+977-9841000004',
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    statusHistory: [
      { status: 'pending', date: Date.now() - 3 * 24 * 60 * 60 * 1000 }
    ]
  },
  {
    id: '5',
    title: 'Blocked drainage causing flooding in Baneshwor',
    description: 'The main drainage pipe near New Baneshwor chowk is completely blocked. Every time it rains, the entire road gets flooded up to knee level. Shops are being damaged.',
    category: 'drainage',
    status: 'in_progress',
    ward: 'Ward 10',
    lat: 27.6910,
    lng: 85.3410,
    photo: null,
    upvotes: 41,
    reportedBy: '+977-9841000005',
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    statusHistory: [
      { status: 'pending', date: Date.now() - 7 * 24 * 60 * 60 * 1000 },
      { status: 'in_progress', date: Date.now() - 3 * 24 * 60 * 60 * 1000 }
    ]
  },
  {
    id: '6',
    title: 'Road collapse near Patan Durbar Square',
    description: 'A section of the road near Patan Durbar Square has collapsed due to underground pipe damage. The area is barricaded but no repair work has started. This is a UNESCO heritage area.',
    category: 'road',
    status: 'pending',
    ward: 'Ward 18',
    lat: 27.6727,
    lng: 85.3250,
    photo: null,
    upvotes: 63,
    reportedBy: '+977-9841000006',
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    statusHistory: [
      { status: 'pending', date: Date.now() - 2 * 24 * 60 * 60 * 1000 }
    ]
  },
  {
    id: '7',
    title: 'Power outage in Maharajgunj area',
    description: 'Frequent power cuts in Maharajgunj area lasting 4-6 hours daily despite the NEA schedule showing no planned outages. Transformer seems faulty.',
    category: 'electricity',
    status: 'resolved',
    ward: 'Ward 3',
    lat: 27.7340,
    lng: 85.3310,
    photo: null,
    upvotes: 19,
    reportedBy: '+977-9841000007',
    createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    statusHistory: [
      { status: 'pending', date: Date.now() - 14 * 24 * 60 * 60 * 1000 },
      { status: 'in_progress', date: Date.now() - 10 * 24 * 60 * 60 * 1000 },
      { status: 'resolved', date: Date.now() - 5 * 24 * 60 * 60 * 1000 }
    ]
  },
  {
    id: '8',
    title: 'Overflowing sewage in Koteshwor',
    description: 'Sewage is overflowing from manholes near Koteshwor chowk. The stench is unbearable and it poses a serious health risk. The issue worsens during rain.',
    category: 'drainage',
    status: 'pending',
    ward: 'Ward 32',
    lat: 27.6780,
    lng: 85.3490,
    photo: null,
    upvotes: 38,
    reportedBy: '+977-9841000008',
    createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
    statusHistory: [
      { status: 'pending', date: Date.now() - 4 * 24 * 60 * 60 * 1000 }
    ]
  },
  {
    id: '9',
    title: 'Illegal dumping site near Bagmati River',
    description: 'Construction waste and household garbage are being illegally dumped on the banks of Bagmati River near Thapathali. This is polluting the river and the surrounding area.',
    category: 'garbage',
    status: 'in_progress',
    ward: 'Ward 11',
    lat: 27.6915,
    lng: 85.3180,
    photo: null,
    upvotes: 72,
    reportedBy: '+977-9841000009',
    createdAt: Date.now() - 8 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    statusHistory: [
      { status: 'pending', date: Date.now() - 8 * 24 * 60 * 60 * 1000 },
      { status: 'in_progress', date: Date.now() - 1 * 24 * 60 * 60 * 1000 }
    ]
  },
  {
    id: '10',
    title: 'Broken water pipe flooding Jawalakhel road',
    description: 'A main water supply pipe has burst near Jawalakhel chowk causing the entire road to flood. Clean drinking water is being wasted while nearby areas face shortage.',
    category: 'water',
    status: 'in_progress',
    ward: 'Ward 21',
    lat: 27.6680,
    lng: 85.3145,
    photo: null,
    upvotes: 45,
    reportedBy: '+977-9841000010',
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 12 * 60 * 60 * 1000,
    statusHistory: [
      { status: 'pending', date: Date.now() - 1 * 24 * 60 * 60 * 1000 },
      { status: 'in_progress', date: Date.now() - 12 * 60 * 60 * 1000 }
    ]
  }
];

function initializeData() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
  }
}

initializeData();

export function getGrievances() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getGrievanceById(id) {
  const all = getGrievances();
  return all.find(g => g.id === id) || null;
}

export function addGrievance(grievance) {
  const all = getGrievances();
  const newGrievance = {
    ...grievance,
    id: Date.now().toString(),
    status: 'pending',
    upvotes: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    statusHistory: [{ status: 'pending', date: Date.now() }]
  };
  all.unshift(newGrievance);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return newGrievance;
}

export function upvoteGrievance(id) {
  const upvoted = getUpvotedIds();
  if (upvoted.includes(id)) return false;

  const all = getGrievances();
  const idx = all.findIndex(g => g.id === id);
  if (idx === -1) return false;

  all[idx].upvotes += 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));

  upvoted.push(id);
  localStorage.setItem(UPVOTES_KEY, JSON.stringify(upvoted));
  return true;
}

export function getUpvotedIds() {
  const data = localStorage.getItem(UPVOTES_KEY);
  return data ? JSON.parse(data) : [];
}

export function hasUpvoted(id) {
  return getUpvotedIds().includes(id);
}

// User session
export function getUser() {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function loginUser(phone) {
  const user = { phone, loggedInAt: Date.now() };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export function logoutUser() {
  localStorage.removeItem(USER_KEY);
}

export function getMyReports() {
  const user = getUser();
  if (!user) return [];
  return getGrievances().filter(g => g.reportedBy === user.phone);
}

export { KATHMANDU_WARDS, CATEGORIES };

export function getStats() {
  const all = getGrievances();
  const total = all.length;
  const resolved = all.filter(g => g.status === 'resolved').length;
  const active = all.filter(g => g.status !== 'resolved').length;
  return { total, resolved, active, resolvedRate: total > 0 ? Math.round((resolved / total) * 100) : 0 };
}

export function formatTimeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return { value: '', key: 'time_just_now' };
  if (minutes < 60) return { value: minutes, key: 'time_ago_minutes' };
  if (hours < 24) return { value: hours, key: 'time_ago_hours' };
  return { value: days, key: 'time_ago_days' };
}
