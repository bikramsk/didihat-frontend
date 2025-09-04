import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const AboutTeam = () => {
  const teamMembers = [
    {
      name: "Name",
      position: "Founder & CEO",
      image: "https://dummyimage.com/300x300/003B95/ffffff&text=NS",
      description: "",
      social: {
      linkedin: "#",
        twitter: "#",
        email: "#"
      }
    },
    {
      name: "Name",
      position: "Head of Operations",
      image: "https://dummyimage.com/300x300/003B95/ffffff&text=NS",
     description: "",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#"
      }
    },
    {
      name: "Name",
      position: "Marketing Director",
      image: "https://dummyimage.com/300x300/003B95/ffffff&text=NS",
      description: "",
      social: {
      linkedin: "#",
        twitter: "#",
        email: "#"
      }
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] text-sm font-medium uppercase tracking-wider">Meet Our Team</span>
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The People Behind DIDIHAT
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our passionate team of travel experts is dedicated to creating unforgettable experiences for every traveler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.position}`}
                    className="w-full h-full object-cover"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#003B95] font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {member.description}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={member.social.linkedin}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#003B95] hover:text-white transition-colors duration-300"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#003B95] hover:text-white transition-colors duration-300"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#003B95] hover:text-white transition-colors duration-300"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;