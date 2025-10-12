// import Masonry from './components/Masonry.js';
// export default function About() {
//   const items = [
//     {
//       id: "1",
//       img: "https://picsum.photos/id/1015/600/900?grayscale",
//       url: "https://example.com/one",
//       height: 400,
//     },
//     {
//       id: "39",
//       img: "https://picsum.photos/id/1011/600/750?grayscale",
//       url: "https://example.com/two",
//       height: 250,
//     },
//     {
//       id: "29",
//       img: "https://picsum.photos/id/1020/600/800?grayscale",
//       url: "https://example.com/three",
//       height: 600,
//     },
//     {
//       id: "19",
//       img: "https://picsum.photos/id/1015/600/900?grayscale",
//       url: "https://example.com/one",
//       height: 400,
//     },
//     {
//       id: "89",
//       img: "https://picsum.photos/id/1011/600/750?grayscale",
//       url: "https://example.com/two",
//       height: 250,
//     },
//     {
//       id: "78",
//       img: "https://picsum.photos/id/1020/600/800?grayscale",
//       url: "https://example.com/three",
//       height: 600,
//     },
//     {
//       id: "85",
//       img: "https://picsum.photos/id/1015/600/900?grayscale",
//       url: "https://example.com/one",
//       height: 400,
//     },
//     {
//       id: "96",
//       img: "https://picsum.photos/id/1011/600/750?grayscale",
//       url: "https://example.com/two",
//       height: 250,
//     },
//     {
//       id: "97",
//       img: "https://picsum.photos/id/1020/600/800?grayscale",
//       url: "https://example.com/three",
//       height: 600,
//     },
//     {
//       id: "98",
//       img: "https://picsum.photos/id/1015/600/900?grayscale",
//       url: "https://example.com/one",
//       height: 400,
//     },
//     {
//       id: "99",
//       img: "https://picsum.photos/id/1011/600/750?grayscale",
//       url: "https://example.com/two",
//       height: 250,
//     },
//     {
//       id: "100",
//       img: "https://picsum.photos/id/1020/600/800?grayscale",
//       url: "https://example.com/three",
//       height: 600,
//     },
//     // ... more items
// ];
//   return (
//     <main style={{ padding: 24, background: 'transparent', color: 'white' }}>
//       {/* leave empty for now or add a placeholder */}
//       {/* Contact page */}
// <div style={{ marginTop: 50, marginRight: 30, marginBottom: 24 }}>
//   <div
//     style={{
//       maxWidth: 720,
//       backgroundColor: '#ffffff75',   // <-- white background
//       color: '#110e3aff',
//       padding: 16,
//       borderRadius: 8,
//     }}
//   >
//     <h1>A few guilty pleasures occupy my free time...</h1>
//     <p>
//       For as long as I can remember, I’ve loved fidgeting with my hands. Whether
//       it’s rewriting the same word in different fonts, painting with a brush,
//       whisking up something new in the kitchen, or snapping photos on my many
//       side quests. Curiosity and creativity have always been at the heart of how
//       I move through the world. I stay enriched by learning, exploring, and
//       picking up new hobbies. When I’m not tinkering with my latest project,
//       you’ll find me off on a silly little adventure. Here are just a few of the
//       things I’ve seen and made!
//     </p>
//   </div>

//   <Masonry
//     items={items}
//     ease="power3.out"
//     duration={0.6}
//     stagger={0.05}
//     animateFrom="bottom"
//     scaleOnHover
//     hoverScale={0.95}
//     blurToFocus
//     colorShiftOnHover={false}
//   />
// </div>
//     </main>
//   );
// }
import Masonry from './components/Masonry';

export default function About() {
  const items = [
    {
      id: 'intro-card',
      
      height: 500, // pick a height that fits your copy
      render: (
        <div style={{ padding: 20 }}>
          <h1 style={{ margin: 0, fontSize: 24, lineHeight: 1.2 }}>
            A few guilty pleasures occupy my free time...
          </h1>
          <p style={{ marginTop: 12 }}>
            For as long as I can remember, I’ve loved fidgeting with my hands.
            Whether it’s rewriting the same word in different fonts, painting with a brush,
            whisking up something new in the kitchen, or snapping photos on my many side quests.
            Curiosity and creativity have always been at the heart of how I move through the world.
            When I’m not tinkering with my latest project, you’ll find me off on a silly little adventure.
            Here are just a few of the things I’ve seen and made!
          </p>
        </div>
      ),
      frameStyle: {
        background: '#ffffff78',
        color: '#12184eff',
      },
    },
    { id: '1', img: '/photos/100_0135.JPG', height: 400 },
    { id: '2', img: '/photos/IMG_4734.jpeg', height: 350 },
    { id: '3', img: '/photos/IMG_6012.jpeg',  height: 250 },
    { id: '4', img: '/photos/IMG_5808.JPG', height: 250 },
    { id: '5', img: '/photos/IMG_9773.jpeg', height: 250 },
    { id: '6', img: '/photos/IMG_5499.jpeg',height: 600 },
    { id: '7', img: '/photos/IMG_4709.jpeg', height: 400 },
    { id: '8', img: '/photos/IMG_4880.jpeg',  height: 400 },
    { id: '9', img: '/photos/IMG_5412.jpeg', height: 300 },
    { id: '10', img: '/photos/IMG_2752.jpeg', height: 300 },
    { id: '11', img: '/photos/IMG_1827.jpeg', height: 200 },
    { id: '12', img: '/photos/IMG_5416.jpeg', height: 400 },
    { id: '13', img: '/photos/IMG_5499.jpeg', height: 600 },
    { id: '14', img: '/photos/IMG_5501.jpeg', height: 600 },
    { id: '15', img: '/photos/IMG_7351.JPG', height: 300 },
    { id: '16', img: '/photos/IMG_8902.jpeg', height: 300 },
    // …more items
  ];

  return (
    <main style={{ padding: 50, background: 'transparent', color: 'white' }}>
      <Masonry
        items={items}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover
        hoverScale={0.98}
        blurToFocus
        colorShiftOnHover={false}
      />
    </main>
  );
}
