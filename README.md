<<<<<<< HEAD
# NoteSummarizer

An AI-powered application that transforms lengthy notes into concise, actionable summaries using advanced natural language processing.

## Features

- 📝 **Smart Summarization**: AI-powered text summarization
- 🎤 **Voice Input**: Record notes using speech recognition
- 📁 **File Upload**: Support for text file uploads
- 📊 **Word Count**: Track original vs summary word counts
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works on desktop and mobile
- 📚 **Note History**: Save and manage your summarized notes
- 🧭 **Navigation**: Multi-page app with Home, About, and Contact sections

## Tech Stack

### Frontend
- React 19 with TypeScript
- Vite for development
- TailwindCSS for styling
- React Router for navigation
- Web Speech API for voice input
- Lucide React for icons

### Backend
- Node.js with Express
- TypeScript
- MongoDB for data storage
- Swagger for API documentation
- CORS for cross-origin requests
- Multer for file uploads

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/NoteSummarizer.git
cd NoteSummarizer
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Set up environment variables:
   - Create `.env` file in backend directory
   - Add your MongoDB connection string and other configs

5. Start the development servers:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## Usage

1. Open your browser and go to `http://localhost:5173`
2. Type or paste your text in the input area
3. Use voice input by clicking the microphone button
4. Upload text files using the file upload feature
5. Click "Summarize" to generate an AI summary
6. View your note history in the sidebar
7. Navigate between Home, About, and Contact pages using the navbar

## Project Structure

```
NoteSummarizer/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Main server file
│   │   ├── config/
│   │   │   └── db.ts         # Database configuration
│   │   ├── controllers/      # API controllers
│   │   ├── models/          # Database models
│   │   └── routes/          # API routes
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## API Endpoints

- `POST /api/summarize` - Summarize text
- `POST /api/upload` - Upload and process files
- `GET /api/notes` - Get note history
- `POST /api/notes` - Save a note

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature/new-feature`)
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- [ ] User authentication and personal note storage
- [ ] Export summaries to various formats (PDF, Word)
- [ ] Integration with cloud storage services
- [ ] Mobile app version
- [ ] Advanced summarization options
- [ ] Collaboration features
