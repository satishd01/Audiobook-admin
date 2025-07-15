export const TEMPLET_SCREEN_CONFIG = {
  numberS2NTemplate: {
    key: "numberS2NTemplate",
    header: "Match Sound To Number",
    columns: [
      {
        Header: "English Question",
        accessor: "engQuestion",
        type: "string",
      },
      {
        Header: "Hindi Question",
        accessor: "hinQuestion",
        type: "string",
      },
      {
        Header: "Options",
        accessor: "options",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, "array"),
      },
      {
        Header: "Answers",
        accessor: "answers",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, "array"),
      },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1BXPXNDXQBD57MWlNjKDrTXHpMF2tbbfCKRJogwT4VF8/edit?usp=drive_link",
    icon: "rule",
  },

  mcqs: {
    key: "mcqs",
    header: "Normal Mcqs",
    columns: [
      {
        Header: "Question",
        accessor: "question",
        type: "string",
      },
      {
        Header: "Options 1",
        accessor: "option1",
        type: "string",
        // Cell: ({ value }) => renderJsonCell(value, 'array'),
      },
      {
        Header: "Options 2",
        accessor: "option2",
        type: "string",
        // Cell: ({ value }) => renderJsonCell(value, 'array'),
      },
      {
        Header: "Options 3",
        accessor: "option3",
        type: "string",
        // Cell: ({ value }) => renderJsonCell(value, 'array'),
      },
      {
        Header: "Options 4",
        accessor: "option4",
        type: "string",
        // Cell: ({ value }) => renderJsonCell(value, 'array'),
      },
      {
        Header: "Answers",
        accessor: "answer",
        type: "string",
        // Cell: ({ value }) => renderJsonCell(value, 'array'),
      },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1TtaDpuFBCmeadlBcp2BHeQRw8bP2LCTIsEj5ZJeV-mE/edit?gid=0#gid=0",
    icon: "rule",
  },

  soundToImageTemplate: {
    key: "soundToImageTemplate",
    header: "Match Sound To Image",
    columns: [
      {
        Header: "English Question",
        accessor: "engQuestion",
        type: "string",
      },
      {
        Header: "Hindi Question",
        accessor: "hinQuestion",
        type: "string",
      },
      {
        Header: "Options",
        accessor: "options",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, "array"),
      },
      {
        Header: "Answers",
        accessor: "answers",
        type: "json",
        Cell: ({ value }) => showimage(value, "array"),
      },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1cKvnLa6MG1wRdr0zIDf9Tu5Ze_5ngeEV4fWXH-UDfbc/edit?gid=0#gid=0",
    icon: "rule",
    pagination: {
      totalRecords: 24,
      currentPage: 5,
      totalPages: 5,
    },
    data: [],
  },

  numberReOrderTemplates: {
    key: "numberReOrderTemplates",
    header: "Re-arrange Activity",
    columns: [
      {
        Header: "Question",
        accessor: "question",
        type: "string",
      },
      {
        Header: "Options",
        accessor: "options",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, "array"),
      },
      {
        Header: "Answer",
        accessor: "answer",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, "array"),
      },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1PQkCMjD7TAW3W4tfsqk0lHWZ4gtJhvK0PNBi0jQ4Bew/edit?gid=0#gid=0",
    icon: "rule",
    pagination: {
      totalRecords: 28,
      currentPage: 5,
      totalPages: 6,
    },
    data: [],
  },

  numberAscDesTemplate: {
    key: "numberAscDesTemplate",
    header: "Number Ascending  Descending",
    columns: [
      {
        Header: "Question",
        accessor: "question",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, "array"),
      },
      {
        Header: "Answer",
        accessor: "answer",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, "array"),
      },
      {
        Header: "English Title",
        accessor: "engTitle",
        type: "string",
      },
      {
        Header: "Hindi Title",
        accessor: "hinTitle",
        type: "string",
      },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1ArrSBpBV4p-fpHT10AZu8sS6mpqOpcOlvaDuTmg_F-I/edit?gid=0#gid=0",
    icon: "rule",
    pagination: {
      totalRecords: 60,
      currentPage: 5,
      totalPages: 12,
    },
    data: [],
  },

  learningFillNumberTemplate: {
    key: "learningFillNumberTemplate",
    header: " Fill The Number",
    columns: [
      {
        Header: "Question",
        accessor: "question",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, "array"),
      },
      {
        Header: "Answer",
        accessor: "answer",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, "array"),
      },
      {
        Header: "English Title",
        accessor: "engTitle",
        type: "string",
      },
      {
        Header: "Hindi Title",
        accessor: "hinTitle",
        type: "string",
      },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1aTcDhkxNi1juwfBR8QIkXwy49MjhDa3RIFlo1Xnp-qQ/edit?gid=0#gid=0",
    icon: "rule",
    pagination: {
      totalRecords: 30,
      currentPage: 5,
      totalPages: 6,
    },
    data: [],
  },

  learningNumberTemplate: {
    key: "learningNumberTemplate",
    header: "Learning Number",
    columns: [
      {
        Header: "Number",
        accessor: "number",
        type: "string",
      },
      {
        Header: "English Number",
        accessor: "engNumber",
        type: "string",
      },
      {
        Header: "Hindi Phonetics",
        accessor: "hinPhonetics",
        type: "string",
      },
      {
        Header: "English Translation",
        accessor: "engTranslation",
        type: "string",
      },
      {
        Header: "English Word",
        accessor: "engWord",
        type: "string",
      },
      {
        Header: "Hindi Word",
        accessor: "hinWord",
        type: "string",
      },
      {
        Header: "Image",
        accessor: "image",
        type: "string",
        Cell: ({ value }) => (
          <img src={value} alt="Number image" style={{ width: 50, height: 50 }} />
        ),
      },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1vnXk01GK5DMDMn4jVYB7I_yL-eVkkwN1f5z7mBUkh1w/edit?gid=0#gid=0",
    icon: "rule",
    pagination: {
      totalRecords: 30,
      currentPage: 5,
      totalPages: 6,
    },
    data: [],
  },

  learningFillAplTemplate: {
    key: "learningFillAplTemplate",
    header: "Fill The Alphabet",
    columns: [
      {
        Header: "English Title",
        accessor: "engTitle",
        type: "string",
      },
      {
        Header: "Hindi Title",
        accessor: "hinTitle",
        type: "string",
      },
      {
        Header: "Questions",
        accessor: "questions",
        type: "array",
      },
      {
        Header: "Options",
        accessor: "options",
        type: "array",
      },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
        Cell: ({ value }) => value || "N/A",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1jkkU9Cl7s7-iuHIlLBR2C4xe8o5gnXqkYJ-r4REORGA/edit?gid=0#gid=0",
    icon: "rule",
    pagination: {
      totalRecords: 28,
      currentPage: 5,
      totalPages: 6,
    },
  },

  learningW2WTemplate: {
    key: "learningW2WTemplate",
    header: "Match Word to Word",
    columns: [
      {
        Header: "English Question",
        accessor: "engQuestion",
        type: "string",
      },
      {
        Header: "Hindi Question",
        accessor: "hinQuestion",
        type: "string",
      },
      {
        Header: "Options",
        accessor: "options",
        type: "array",
        // Cell: ({ value }) => value.join(", "),
      },
      {
        Header: "Answers",
        accessor: "answers",
        type: "array",
        // Cell: ({ value }) => value.join(", "),
      },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1m7phWjHexIXj64lILs9yXUS6CilrqAKD23TVBrUM5dc/edit?gid=0#gid=0",
    icon: "rule",
    pagination: {
      totalRecords: 21,
      currentPage: 5,
      totalPages: 5,
    },
    data: [],
  },

  // New templates
  learningS2TTemplates: {
    key: "learningS2TTemplate",
    header: "Match Sound To word",
    columns: [
      {
        Header: "English Question",
        accessor: "engQuestion",
        type: "string",
      },
      {
        Header: "Hindi Question",
        accessor: "hinQuestion",
        type: "string",
      },
      {
        Header: "Options",
        accessor: "options",
        type: "json",
        Cell: ({ value }) => showimage(value, "array"),
      },
      {
        Header: "Answers",
        accessor: "answers",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, "array"),
      },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1eIt6l3kYvGZdLhTfjxVjSXN6098MWJgWTA7cijVNVeA/edit?gid=0#gid=0",
    icon: "volume-up",
  },

  // learningSlideTemplates: {
  //   key: "learningSlideTemplate",
  //   header: "Learning Slides",
  //   columns: [
  //     {
  //       Header: "Key",
  //       accessor: "key",
  //       type: "string",
  //     },
  //     {
  //       Header: "Capital Alphabet",
  //       accessor: "capitalAlphabet",
  //       type: "json",
  //       Cell: ({ value }) => renderJsonCell(value, 'array'),
  //     },
  //     {
  //       Header: "Small Alphabet",
  //       accessor: "smallAlphabet",
  //       type: "json",
  //       Cell: ({ value }) => renderJsonCell(value, 'array'),
  //     },
  //     {
  //       Header: "Hindi  Alphabet",
  //       accessor: "hindiAlphabet",
  //       type: "json",
  //       Cell: ({ value }) => renderJsonCell(value, 'array'),
  //     },
  //     {
  //       Header: "English Word",
  //       accessor: "englishWord",
  //       type: "json",
  //       Cell: ({ value }) => renderJsonCell(value, 'array'),
  //     },
  //     {
  //       Header: "Hindi Phonetic-Word",
  //       accessor: "hindiPhoneticWord",
  //       type: "json",
  //       Cell: ({ value }) => renderJsonCell(value, 'array'),
  //     },
  //     {
  //       Header: "Hindi Trasnalation",
  //       accessor: "hindiTranslation",
  //       type: "json",
  //       Cell: ({ value }) => renderJsonCell(value, 'array'),
  //     },
  //     {
  //       Header: "Word Image",
  //       accessor: "wordImage",
  //       type: "jsonarray",
  //       Cell: ({ value }) => <img src={value} alt="Slide" style={{ width: 100, height: 100 }} />,
  //     },
  //     {
  //       Header: "University",
  //       accessor: "University.name",
  //       type: "string",
  //     },
  //     {
  //       Header: "Subject",
  //       accessor: "Subject.name",
  //       type: "string",
  //     },
  //     {
  //       Header: "Grade",
  //       accessor: "Grade.name",
  //       type: "string",
  //     },
  //   ],
  //   importSampleFile: "https://docs.google.com/spreadsheets/d/1Vkii3SCwgU_E9xfm2FXrgiziq8e7ihzIvqdeba_83Mw/edit?gid=0#gid=0",
  //   icon: "slide",
  // },

  imageToLetterTemplates: {
    key: "imageToLetterTemplate",
    header: "Match Image to Word",
    columns: [
      {
        Header: "Image",
        accessor: "image",
        type: "string",
        Cell: ({ value }) => <img src={value} alt="Image" style={{ width: 50, height: 50 }} />,
      },
      {
        Header: "key",
        accessor: "key",
        type: "string",
      },
      {
        Header: "English question",
        accessor: "engQuestion",
        type: "string",
      },
      {
        Header: "hindi question",
        accessor: "hinQuestion",
        type: "string",
      },
      {
        Header: "sound",
        accessor: "sound",
        type: "string",
      },
      {
        Header: "Options",
        accessor: "options",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, "array"),
      },
      {
        Header: "Correct answer",
        accessor: "correctAnswer",
        type: "string",
      },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/18HBeZ9xLeQBgI6v_OELkeyP-qQdthqLsSJeYm5XVz-k/edit?gid=0#gid=0",
    icon: "image",
  },

  fillTheVowelTemplates: {
    key: "fillTheVowelTemplate",
    header: "Fill the Vowel",
    columns: [
      {
        Header: "Points",
        accessor: "points",
        type: "string",
      },
      {
        Header: "Type",
        accessor: "type",
        type: "string",
      },
      {
        Header: "Key",
        accessor: "key",
        type: "string",
      },
      {
        Header: "English Title",
        accessor: "engTitle",
        type: "string",
      },
      {
        Header: "Hindi Title",
        accessor: "hinTitle",
        type: "string",
      },
      {
        Header: "Questions",
        accessor: "questions",
        type: "array",
        Cell: ({ value }) => renderJsonCell(value, "array"),
      },
      {
        Header: "Options",
        accessor: "options",
        type: "array",
        Cell: ({ value }) => renderJsonCell(value, "array"),
      },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1eJldr5TVAGjKFXImorJMC-stf1pNwD1TONzVHN-EoCs/edit?gid=0#gid=0",
    icon: "vowel",
  },

  storyTemplates: {
    key: "storyTemplate",
    header: "Story Telling",
    columns: [
      {
        Header: "Key",
        accessor: "key",
        type: "string",
      },
      {
        Header: "Title",
        accessor: "title",
        type: "string",
      },
      {
        Header: "Layout",
        accessor: "layout",
        type: "array",
        Cell: ({ value }) => {
          if (!value || !Array.isArray(value)) {
            return <div>No layout data available</div>;
          }
          return (
            <div>
              {value.map((scene, index) => (
                <div key={index}>
                  <p>
                    <strong>Scene {index + 1}:</strong> {scene.text}
                  </p>
                  {scene.assets && scene.assets.path && (
                    <img
                      src={scene.assets.path}
                      alt={`Scene ${index + 1}`}
                      style={{ width: 50, height: 50 }}
                    />
                  )}
                  <p>
                    <strong>Highlighted Words:</strong> {scene.highlightedWords.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          );
        },
      },
      {
        Header: "Highlight Words",
        accessor: "highlightedWords",
        type: "array",
        Cell: ({ value }) => {
          if (!value || !Array.isArray(value)) {
            return <div>No highlighted words available</div>;
          }
          return <div>{value.join(", ")}</div>;
        },
      },
      {
        Header: "Images",
        accessor: "images",
        type: "array",
        Cell: ({ value }) => {
          if (!value || !Array.isArray(value)) {
            return <div>No images available</div>;
          }
          return (
            <div>
              {value.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  style={{ width: 50, height: 50 }}
                />
              ))}
            </div>
          );
        },
      },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1hgQ4yhsRIUQP_bocY3g3ZsatXtAgLQmbxs_Ctp1dWJw/edit?gid=0#gid=0",
    icon: "book",
  },

  sayWordTemplates: {
    key: "sayWordTemplate",
    header: "Say Word",
    columns: [
      {
        Header: "Key",
        accessor: "key",
        type: "string",
      },
      {
        Header: "Question",
        accessor: "question",
        type: "string",
      },
      {
        Header: "Word",
        accessor: "word",
        type: "string",
      },
      // {
      //   Header: "Image",
      //   accessor: "image",
      //   type: "string",
      //   Cell: ({ value }) => <img src={value} alt="Story" style={{ width: 100, height: 100 }} />,
      // },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
      },
    ],

    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1cYclzvhzGbFUoZLzxZonM9vwTo7wHQvvo_07NV7Ydr8/edit?gid=0#gid=0", // Assuming this URL is correct
    icon: "microphone",
  },

  // storyTemplates: {
  //   key: "storyTemplate",
  //   header: "Story Templates",
  //   columns: [
  //     {
  //       Header: "Key",
  //       accessor: "key",
  //       type: "string",
  //     },
  //     {
  //       Header: "Title",
  //       accessor: "title",
  //       type: "string",
  //     },
  //     {
  //       Header: "Layout",
  //       accessor: "layout",
  //       type: "array",
  //       Cell: ({ value }) => {
  //         if (!value || !Array.isArray(value)) {
  //           return <div>No layout data available</div>;
  //         }
  //         return (
  //           <div>
  //             {value.map((scene, index) => (
  //               <div key={index}>
  //                 <p><strong>Scene {index + 1}:</strong> {scene.text}</p>
  //                 {scene.assets && scene.assets.path && (
  //                   <img src={scene.assets.path} alt={`Scene ${index + 1}`} style={{ width: 50, height: 50 }} />
  //                 )}
  //                 <p><strong>Highlighted Words:</strong> {scene.highlightedWords.join(", ")}</p>
  //               </div>
  //             ))}
  //           </div>
  //         );
  //       },
  //     },
  //     {
  //       Header: "Highlight Words",
  //       accessor: "highlightedWords",
  //       type: "array",
  //       Cell: ({ value }) => {
  //         if (!value || !Array.isArray(value)) {
  //           return <div>No highlighted words available</div>;
  //         }
  //         return <div>{value.join(", ")}</div>;
  //       },
  //     },
  //     {
  //       Header: "Images",
  //       accessor: "images",
  //       type: "array",
  //       Cell: ({ value }) => {
  //         if (!value || !Array.isArray(value)) {
  //           return <div>No images available</div>;
  //         }
  //         return (
  //           <div>
  //             {value.map((image, index) => (
  //               <img key={index} src={image} alt={`Image ${index + 1}`} style={{ width: 50, height: 50 }} />
  //             ))}
  //           </div>
  //         );
  //       },
  //     },
  //     {
  //       Header: "University",
  //       accessor: "University.name",
  //       type: "string",
  //     },
  //     {
  //       Header: "Subject",
  //       accessor: "Subject.name",
  //       type: "string",
  //     },
  //     {
  //       Header: "Grade",
  //       accessor: "Grade.name",
  //       type: "string",
  //     },
  //   ],
  //   importSampleFile: "https://docs.google.com/spreadsheets/d/1hgQ4yhsRIUQP_bocY3g3ZsatXtAgLQmbxs_Ctp1dWJw/edit?gid=0#gid=0",
  //   icon: "book",
  // },

  imageMCQTemplates: {
    key: "imageMCQTemplate",
    header: "MCQs with Image",
    columns: [
      {
        Header: "index",
        accessor: "index",
        type: "string",
      },
      {
        Header: "points",
        accessor: "points",
        type: "string",
      },
      {
        Header: "key",
        accessor: "key",
        type: "string",
      },
      {
        Header: "English Title",
        accessor: "engTitle",
        type: "string",
      },
      {
        Header: "Hindi Title",
        accessor: "hinTitle",
        type: "string",
      },
      {
        Header: "Image",
        accessor: "image",
        type: "string",
        Cell: ({ value }) => <img src={value} alt="imagemcq" style={{ width: 100, height: 100 }} />,
      },
      {
        Header: "Sound",
        accessor: "sound",
        type: "string",
      },
      {
        Header: "Options",
        accessor: "options",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, "array"),
      },
      {
        Header: "correct answer",
        accessor: "correctAnswer",
        type: "string",
      },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
      },
    ],

    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1UyyrGRA4dMjLREIONQiY7lFtwGiocY5vPEdCzoMxYRQ/edit?gid=0#gid=0", // Assuming this URL is correct
    icon: "microphone",
  },

  flipCardTemplate: {
    key: "flipCardTemplate",
    header: "Flipping Card Activity",
    columns: [
      {
        Header: "Key",
        accessor: "key",
        type: "string",
      },
      {
        Header: "Points",
        accessor: "points",
        type: "string",
      },
      {
        Header: "English Question",
        accessor: "engQuestion",
        type: "string",
      },
      {
        Header: "Hindi Question",
        accessor: "hinQuestion",
        type: "string",
      },
      {
        Header: "Images",
        accessor: "images",
        type: "array",
        Cell: ({ value }) => {
          if (!value || !Array.isArray(value)) {
            return <div>No images available</div>;
          }
          return (
            <div>
              {value.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  style={{ width: 50, height: 50 }}
                />
              ))}
            </div>
          );
        },
      },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/13lDoUSZOLzj6hZhlq38UeUrmyRFNEf-wESB_dp1dGIw/edit?gid=0#gid=0",
    icon: "book",
  },
};

const renderJsonCell = (value, type = "default") => {
  if (!value) return "-";

  try {
    const data = typeof value === "string" ? JSON.parse(value) : value;

    switch (type) {
      case "object":
        return (
          <div style={{ whiteSpace: "pre-wrap", maxWidth: "200px" }}>
            {Object.entries(data).map(([key, val]) => (
              <div key={key}>
                <strong>{key}:</strong> {val}
              </div>
            ))}
          </div>
        );

      case "array":
        if (Array.isArray(data)) {
          return (
            <div style={{ whiteSpace: "pre-wrap" }}>
              {"["}
              {data.join(", ")}
              {"]"}
            </div>
          );
        }
        return <div style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data, null, 2)}</div>;

      default:
        return <div style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data, null, 2)}</div>;
    }
  } catch (error) {
    return "Invalid JSON";
  }
};
const showimage = (value, type = "default") => {
  if (!value) return "-";
  // debugger

  try {
    const data = typeof value === "string" ? JSON.parse(value) : value;

    switch (type) {
      case "single":
        return <img src={value} alt="Number image" style={{ width: 50, height: 50 }} />;

      case "array":
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            {data.map((path, index) => (
              <img
                key={index}
                src={`${process.env.REACT_APP_API_URL}${path}`} // Concatenating backend URL with path
                alt={`Image ${index + 1}`}
                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
              />
            ))}
          </div>
        );

      default:
        return <div style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data, null, 2)}</div>;
    }
  } catch (error) {
    return "Invalid JSON";
  }
};
