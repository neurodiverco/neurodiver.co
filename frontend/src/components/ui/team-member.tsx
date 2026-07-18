type TeamMember = {
  name: string;
  role: string;
  src: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Dhinesha",
    role: "Founder & CEO",
    src:
      "images/dhinesha.jpg",
  },
  {
    name: "Pavitraa",
    role: "CEO",
    src:
      "images/pavi.jpg",
  },
  {
    name: "Adibah",
    role: "HR",
    src:
      "images/adibah.jpg",
  },
  {
    name: "Ridhwan",
    role: "HR",
    src:
      "images/ridhwan.jpg",
  },
  {
    name: "Kaiden",
    role: "Product Manager",
    src:
      "images/kaiden.jpg",
  },
];


const TeamCard = ({ member }: { member: TeamMember }) => {

  return (

    <div
      className="
      group
      flex
      flex-col
      items-center
      text-center
      bg-white
      rounded-[1.5rem]
      border
      border-primary/10
      p-4
      md:p-6
      transition-all
      duration-500
      hover:-translate-y-2
      hover:shadow-xl
      hover:shadow-primary/10
      "
    >

      {/* Image */}

      <div className="relative mb-4">

        <div
          className="
          absolute
          inset-0
          rounded-full
          bg-yellow/50
          blur-xl
          opacity-0
          group-hover:opacity-100
          transition
          "
        />


        <img
          src={member.src}
          alt={member.name}
          className="
          relative
          rounded-full
          object-cover
          border-4
          border-cream
          shadow-md
          w-20
          h-20
          md:w-28
          md:h-28
          lg:w-32
          lg:h-32
          "
        />

      </div>


      <h3
        className="
        text-sm
        md:text-base
        lg:text-lg
        font-semibold
        text-primary
        mb-2
        "
      >
        {member.name}
      </h3>


      <span
        className="
        rounded-full
        bg-yellow/40
        text-primary-dark
        px-2
        py-1
        text-[10px]
        md:text-xs
        font-medium
        "
      >
        {member.role}
      </span>



    </div>

  )

}




export default function TeamMemberSection(){


return (

<section
className="
relative
overflow-hidden
bg-cream
py-20
md:py-28
"
>


{/* Background Bokeh */}

<div
className="
absolute
top-10
left-10
w-64
h-64
rounded-full
bg-yellow/40
blur-3xl
animate-float
"
/>


<div
className="
absolute
right-0
bottom-10
w-80
h-80
rounded-full
bg-orange/20
blur-3xl
animate-float
"
/>



<div
className="
relative
max-w-7xl
mx-auto
px-5
"
>


{/* Header */}

<div
className="
text-center
max-w-3xl
mx-auto
mb-12
md:mb-16
animate-reveal-up
"
>


<p
className="
inline-flex
px-4
py-2
rounded-full
bg-yellow/50
text-primary
text-xs
md:text-sm
font-medium
mb-5
"
>
Meet Our Team
</p>



<h2
className="
font-serif
text-primary
text-4xl
md:text-6xl
leading-tight
mb-5
"
>
People behind
<br/>
meaningful impact
</h2>



<p
className="
text-primary/70
text-sm
md:text-lg
leading-relaxed
"
>
A passionate team combining expertise, creativity, and empathy
to create solutions that empower people and communities.
</p>


</div>



{/* Team Grid */}
<div
  className="
  grid
  grid-cols-6
  lg:grid-cols-5
  gap-4
  md:gap-6
  "
>
  {teamMembers.map((member, index) => (
    <div
      key={member.name}
      className={`
      animate-reveal-up

      /* Mobile & Tablet: 3 cards on first row */
      col-span-2

      /* Desktop: 5 cards in one row */
      lg:col-span-1

      /* Center the bottom two cards */
      ${index === 3 ? "col-start-2 lg:col-start-auto" : ""}
      ${index === 4 ? "col-start-4 lg:col-start-auto" : ""}
      `}
      style={{
        animationDelay: `${index * 120}ms`,
      }}
    >
      <TeamCard member={member} />
    </div>
  ))}
</div>
</div>


</section>

)

}