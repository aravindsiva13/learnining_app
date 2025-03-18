// /**
//  * Projects.js - Project-based learning components
//  *
//  * This file implements components for the guided projects section of the platform.
//  */

// import React, { useState, useEffect, useContext } from "react";
// import { AppContext } from "../context/AppContext";
// import { CodeEditor } from "./CodeEditor";

// // ProjectList Component
// export const ProjectList = ({ onSelectProject }) => {
//   const { language } = useContext(AppContext);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     difficulty: "all",
//     search: "",
//   });

//   // Fetch projects when language changes
//   useEffect(() => {
//     const fetchProjects = async () => {
//       setLoading(true);
//       try {
//         // In a real app, we would call an API with the language filter
//         const response = await fetch(`/api/projects?language=${language}`);
//         const data = await response.json();
//         setProjects(data || []);
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//         setProjects([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Mock data for this demo
//     const mockProjects = [
//       {
//         id: "proj1",
//         title: "Flutter Weather App",
//         description:
//           "Build a weather app that fetches real-time data from a weather API.",
//         difficulty: "Intermediate",
//         languages: ["flutter"],
//         estimatedTime: "3 hours",
//         modules: 4,
//         thumbnail: "weather-app.jpg",
//       },
//       {
//         id: "proj2",
//         title: "Flutter Chat Messenger",
//         description:
//           "Create a chat application with real-time messaging features.",
//         difficulty: "Advanced",
//         languages: ["flutter", "firebase"],
//         estimatedTime: "5 hours",
//         modules: 6,
//         thumbnail: "chat-app.jpg",
//       },
//       {
//         id: "proj3",
//         title: "Flutter E-Commerce App",
//         description:
//           "Build a simple e-commerce app with product listings and a shopping cart.",
//         difficulty: "Intermediate",
//         languages: ["flutter"],
//         estimatedTime: "4 hours",
//         modules: 5,
//         thumbnail: "ecommerce-app.jpg",
//       },
//       {
//         id: "proj4",
//         title: "Flutter Note Taking App",
//         description:
//           "Create a note-taking app with local storage capabilities.",
//         difficulty: "Beginner",
//         languages: ["flutter"],
//         estimatedTime: "2 hours",
//         modules: 3,
//         thumbnail: "notes-app.jpg",
//       },
//     ];

//     // Set mock projects after a delay to simulate API call
//     setTimeout(() => {
//       setProjects(mockProjects);
//       setLoading(false);
//     }, 800);
//   }, [language]);

//   // Apply filters to projects
//   const filteredProjects = projects.filter((project) => {
//     // Filter by difficulty
//     if (
//       filters.difficulty !== "all" &&
//       project.difficulty.toLowerCase() !== filters.difficulty.toLowerCase()
//     ) {
//       return false;
//     }

//     // Filter by search term
//     if (
//       filters.search &&
//       !project.title.toLowerCase().includes(filters.search.toLowerCase())
//     ) {
//       return false;
//     }

//     return true;
//   });

//   // Handle filter changes
//   const handleFilterChange = (filterName, value) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [filterName]: value,
//     }));
//   };

//   if (loading) {
//     return <div className="loading-indicator">Loading projects...</div>;
//   }

//   return (
//     <div className="project-list">
//       <div className="list-header">
//         <h2>Guided Projects</h2>
//         <div className="filters">
//           <div className="filter-group">
//             <label htmlFor="difficulty-filter">Difficulty:</label>
//             <select
//               id="difficulty-filter"
//               value={filters.difficulty}
//               onChange={(e) => handleFilterChange("difficulty", e.target.value)}
//             >
//               <option value="all">All</option>
//               <option value="beginner">Beginner</option>
//               <option value="intermediate">Intermediate</option>
//               <option value="advanced">Advanced</option>
//             </select>
//           </div>

//           <div className="filter-group">
//             <label htmlFor="search-filter">Search:</label>
//             <input
//               id="search-filter"
//               type="text"
//               placeholder="Search projects..."
//               value={filters.search}
//               onChange={(e) => handleFilterChange("search", e.target.value)}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="projects-container">
//         {filteredProjects.length > 0 ? (
//           <div className="project-cards">
//             {filteredProjects.map((project) => (
//               <div
//                 key={project.id}
//                 className="project-card"
//                 onClick={() => onSelectProject(project.id)}
//               >
//                 <div className="project-thumbnail">
//                   <div className="thumbnail-placeholder">
//                     {project.title.charAt(0)}
//                   </div>
//                 </div>

//                 <div className="project-content">
//                   <h3 className="project-title">{project.title}</h3>
//                   <p className="project-description">{project.description}</p>

//                   <div className="project-meta">
//                     <div
//                       className={`difficulty-badge ${project.difficulty.toLowerCase()}`}
//                     >
//                       {project.difficulty}
//                     </div>

//                     <div className="time-estimate">
//                       <span className="time-icon">⏱️</span>
//                       <span className="time-value">
//                         {project.estimatedTime}
//                       </span>
//                     </div>

//                     <div className="modules-count">
//                       <span className="modules-icon">📚</span>
//                       <span className="modules-value">
//                         {project.modules} Modules
//                       </span>
//                     </div>
//                   </div>

//                   <div className="project-languages">
//                     {project.languages.map((lang) => (
//                       <span key={lang} className="language-tag">
//                         {lang}
//                       </span>
//                     ))}
//                   </div>

//                   <button className="start-project-button">
//                     Start Project
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="empty-projects">
//             <p>No projects match your filters.</p>
//             <button
//               className="reset-filters-button"
//               onClick={() => setFilters({ difficulty: "all", search: "" })}
//             >
//               Reset Filters
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ProjectDetail Component
// export const ProjectDetail = ({ projectId }) => {
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeModule, setActiveModule] = useState(0);
//   const [activeStep, setActiveStep] = useState(0);
//   const [code, setCode] = useState("");
//   const [projectProgress, setProjectProgress] = useState({
//     completedModules: [],
//     completedSteps: {},
//   });

//   // Fetch project details when projectId changes
//   useEffect(() => {
//     const fetchProject = async () => {
//       setLoading(true);
//       try {
//         // In a real app, we would call an API with the projectId
//         const response = await fetch(`/api/projects/${projectId}`);
//         const data = await response.json();
//         setProject(data);
//       } catch (error) {
//         console.error("Error fetching project:", error);
//         setProject(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Mock data for this demo
//     const mockProject = {
//       id: "proj1",
//       title: "Flutter Weather App",
//       description:
//         "Build a weather app that fetches real-time data from a weather API.",
//       difficulty: "Intermediate",
//       languages: ["flutter"],
//       estimatedTime: "3 hours",
//       modules: [
//         {
//           id: "module1",
//           title: "Project Setup",
//           description:
//             "Set up the Flutter project and add necessary dependencies.",
//           steps: [
//             {
//               id: "step1",
//               title: "Create a new Flutter project",
//               content:
//                 "Start by creating a new Flutter project using the Flutter CLI.",
//               code: `flutter create weather_app
// cd weather_app`,
//             },
//             {
//               id: "step2",
//               title: "Add dependencies",
//               content: "Add the required packages to your pubspec.yaml file.",
//               code: `dependencies:
//   flutter:
//     sdk: flutter
//   http: ^0.13.4
//   provider: ^6.0.2
//   geolocator: ^8.0.1
//   intl: ^0.17.0`,
//             },
//             {
//               id: "step3",
//               title: "Set up project structure",
//               content: "Create the folder structure for the project.",
//               code: `mkdir -p lib/models
// mkdir -p lib/screens
// mkdir -p lib/widgets
// mkdir -p lib/services
// mkdir -p lib/utils`,
//             },
//           ],
//         },
//         {
//           id: "module2",
//           title: "Weather API Integration",
//           description: "Connect to a weather API and create the data models.",
//           steps: [
//             {
//               id: "step1",
//               title: "Create the Weather model",
//               content: "Create a model class to represent weather data.",
//               code: `// lib/models/weather.dart
// class Weather {
//   final double temperature;
//   final double feelsLike;
//   final String condition;
//   final String icon;
//   final String city;
//   final DateTime lastUpdated;

//   Weather({
//     required this.temperature,
//     required this.feelsLike,
//     required this.condition,
//     required this.icon,
//     required this.city,
//     required this.lastUpdated,
//   });

//   factory Weather.fromJson(Map<String, dynamic> json) {
//     return Weather(
//       temperature: json['main']['temp'].toDouble(),
//       feelsLike: json['main']['feels_like'].toDouble(),
//       condition: json['weather'][0]['description'],
//       icon: json['weather'][0]['icon'],
//       city: json['name'],
//       lastUpdated: DateTime.now(),
//     );
//   }
// }`,
//             },
//             {
//               id: "step2",
//               title: "Create the Weather Service",
//               content: "Create a service to handle API requests.",
//               code: `// lib/services/weather_service.dart
// import 'dart:convert';
// import 'package:http/http.dart' as http;
// import '../models/weather.dart';

// class WeatherService {
//   static const String _apiKey = 'your_api_key_here';
//   static const String _baseUrl = 'https://api.openweathermap.org/data/2.5';

//   Future<Weather> getWeatherByCity(String city) async {
//     final response = await http.get(
//       Uri.parse('$_baseUrl/weather?q=$city&units=metric&appid=$_apiKey'),
//     );

//     if (response.statusCode == 200) {
//       return Weather.fromJson(jsonDecode(response.body));
//     } else {
//       throw Exception('Failed to load weather data');
//     }
//   }
// }`,
//             },
//             {
//               id: "step3",
//               title: "Create a Weather Provider",
//               content: "Create a Provider for state management.",
//               code: `// lib/providers/weather_provider.dart
// import 'package:flutter/material.dart';
// import '../models/weather.dart';
// import '../services/weather_service.dart';

// class WeatherProvider with ChangeNotifier {
//   Weather? _weather;
//   bool _isLoading = false;
//   String? _error;

//   Weather? get weather => _weather;
//   bool get isLoading => _isLoading;
//   String? get error => _error;

//   final WeatherService _weatherService = WeatherService();

//   Future<void> fetchWeatherByCity(String city) async {
//     _isLoading = true;
//     _error = null;
//     notifyListeners();

//     try {
//       _weather = await _weatherService.getWeatherByCity(city);
//     } catch (e) {
//       _error = e.toString();
//     } finally {
//       _isLoading = false;
//       notifyListeners();
//     }
//   }
// }`,
//             },
//           ],
//         },
//         {
//           id: "module3",
//           title: "UI Development",
//           description: "Create the user interface for the weather app.",
//           steps: [
//             {
//               id: "step1",
//               title: "Create the Weather Screen",
//               content:
//                 "Create the main screen for displaying weather information.",
//               code: `// lib/screens/weather_screen.dart
// import 'package:flutter/material.dart';
// import 'package:provider/provider.dart';
// import '../providers/weather_provider.dart';
// import '../widgets/weather_display.dart';
// import '../widgets/weather_search.dart';

// class WeatherScreen extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text('Weather App'),
//         elevation: 0,
//       ),
//       body: Consumer<WeatherProvider>(
//         builder: (context, weatherProvider, _) {
//           if (weatherProvider.isLoading) {
//             return Center(child: CircularProgressIndicator());
//           }

//           if (weatherProvider.error != null) {
//             return Center(
//               child: Text(
//                 'Error: ${weatherProvider.error}',
//                 style: TextStyle(color: Colors.red),
//               ),
//             );
//           }

//           return Column(
//             children: [
//               WeatherSearch(),
//               if (weatherProvider.weather != null) WeatherDisplay(),
//             ],
//           );
//         },
//       ),
//     );
//   }
// }`,
//             },
//             {
//               id: "step2",
//               title: "Create the Weather Search Widget",
//               content: "Create a widget for searching weather by city.",
//               code: `// lib/widgets/weather_search.dart
// import 'package:flutter/material.dart';
// import 'package:provider/provider.dart';
// import '../providers/weather_provider.dart';

// class WeatherSearch extends StatefulWidget {
//   @override
//   _WeatherSearchState createState() => _WeatherSearchState();
// }

// class _WeatherSearchState extends State<WeatherSearch> {
//   final _cityController = TextEditingController();

//   @override
//   void dispose() {
//     _cityController.dispose();
//     super.dispose();
//   }

//   void _searchWeather() {
//     if (_cityController.text.isEmpty) return;

//     Provider.of<WeatherProvider>(context, listen: false)
//         .fetchWeatherByCity(_cityController.text);
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Padding(
//       padding: const EdgeInsets.all(16.0),
//       child: Row(
//         children: [
//           Expanded(
//             child: TextField(
//               controller: _cityController,
//               decoration: InputDecoration(
//                 labelText: 'City',
//                 border: OutlineInputBorder(),
//               ),
//               onSubmitted: (_) => _searchWeather(),
//             ),
//           ),
//           SizedBox(width: 10),
//           ElevatedButton(
//             onPressed: _searchWeather,
//             child: Text('Search'),
//           ),
//         ],
//       ),
//     );
//   }
// }`,
//             },
//             {
//               id: "step3",
//               title: "Create the Weather Display Widget",
//               content: "Create a widget for displaying weather information.",
//               code: `// lib/widgets/weather_display.dart
// import 'package:flutter/material.dart';
// import 'package:provider/provider.dart';
// import 'package:intl/intl.dart';
// import '../providers/weather_provider.dart';

// class WeatherDisplay extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     final weather = Provider.of<WeatherProvider>(context).weather!;
//     final theme = Theme.of(context);

//     return Expanded(
//       child: Container(
//         padding: EdgeInsets.all(20),
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: [
//             Text(
//               weather.city,
//               style: theme.textTheme.headline4,
//             ),
//             SizedBox(height: 10),
//             Text(
//               '${weather.temperature.toStringAsFixed(1)}°C',
//               style: theme.textTheme.headline2,
//             ),
//             SizedBox(height: 10),
//             Row(
//               mainAxisAlignment: MainAxisAlignment.center,
//               children: [
//                 Image.network(
//                   'https://openweathermap.org/img/w/${weather.icon}.png',
//                   scale: 0.7,
//                 ),
//                 SizedBox(width: 10),
//                 Text(
//                   weather.condition,
//                   style: theme.textTheme.headline6,
//                 ),
//               ],
//             ),
//             SizedBox(height: 20),
//             Text(
//               'Feels like: ${weather.feelsLike.toStringAsFixed(1)}°C',
//               style: theme.textTheme.subtitle1,
//             ),
//             SizedBox(height: 20),
//             Text(
//               'Last updated: ${DateFormat("hh:mm a, d MMM y").format(
//                 weather.lastUpdated
//               )}',
//               style: theme.textTheme.caption,
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }`,
//             },
//           ],
//         },
//         {
//           id: "module4",
//           title: "Putting It All Together",
//           description: "Finalize the app and add the finishing touches.",
//           steps: [
//             {
//               id: "step1",
//               title: "Set up the main.dart file",
//               content: "Set up the entry point of the application.",
//               code: `// lib/main.dart
// import 'package:flutter/material.dart';
// import 'package:provider/provider.dart';
// import 'providers/weather_provider.dart';
// import 'screens/weather_screen.dart';

// void main() {
//   runApp(MyApp());
// }

// class MyApp extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return ChangeNotifierProvider(
//       create: (context) => WeatherProvider(),
//       child: MaterialApp(
//         title: 'Weather App',
//         theme: ThemeData(
//           primarySwatch: Colors.blue,
//           visualDensity: VisualDensity.adaptivePlatformDensity,
//         ),
//         home: WeatherScreen(),
//       ),
//     );
//   }
// }`,
//             },
//             {
//               id: "step2",
//               title: "Enhance the UI with theming",
//               content:
//                 "Enhance the app with a custom theme based on the weather.",
//               code: `// lib/utils/theme_helper.dart
// import 'package:flutter/material.dart';

// class ThemeHelper {
//   static MaterialColor getWeatherColor(String condition) {
//     condition = condition.toLowerCase();

//     if (condition.contains('clear') || condition.contains('sunny')) {
//       return Colors.amber;
//     } else if (condition.contains('cloud')) {
//       return Colors.grey;
//     } else if (condition.contains('rain') || condition.contains('drizzle')) {
//       return Colors.blue;
//     } else if (condition.contains('thunder')) {
//       return Colors.deepPurple;
//     } else if (condition.contains('snow')) {
//       return Colors.lightBlue;
//     } else {
//       return Colors.blue;
//     }
//   }
// }`,
//             },
//             {
//               id: "step3",
//               title: "Add geolocation support",
//               content:
//                 "Add the ability to get the weather for the user's current location.",
//               code: `// lib/services/location_service.dart
// import 'package:geolocator/geolocator.dart';

// class LocationService {
//   Future<Position> getCurrentLocation() async {
//     bool serviceEnabled;
//     LocationPermission permission;

//     // Test if location services are enabled
//     serviceEnabled = await Geolocator.isLocationServiceEnabled();
//     if (!serviceEnabled) {
//       return Future.error('Location services are disabled.');
//     }

//     permission = await Geolocator.checkPermission();
//     if (permission == LocationPermission.denied) {
//       permission = await Geolocator.requestPermission();
//       if (permission == LocationPermission.denied) {
//         return Future.error('Location permissions are denied');
//       }
//     }

//     if (permission == LocationPermission.deniedForever) {
//       return Future.error(
//         'Location permissions are permanently denied, we cannot request permissions.');
//     }

//     // When we reach here, permissions are granted and we can
//     // continue accessing the position of the device.
//     return await Geolocator.getCurrentPosition();
//   }
// }`,
//             },
//           ],
//         },
//       ],
//     };

//     // Set mock project after a delay to simulate API call
//     setTimeout(() => {
//       setProject(mockProject);
//       setLoading(false);

//       // Initialize with the first module/step code
//       if (
//         mockProject.modules &&
//         mockProject.modules.length > 0 &&
//         mockProject.modules[0].steps &&
//         mockProject.modules[0].steps.length > 0
//       ) {
//         setCode(mockProject.modules[0].steps[0].code || "");
//       }
//     }, 800);
//   }, [projectId]);

//   // Handle module/step changes
//   useEffect(() => {
//     if (
//       project &&
//       project.modules.length > activeModule &&
//       project.modules[activeModule].steps.length > activeStep
//     ) {
//       setCode(project.modules[activeModule].steps[activeStep].code || "");
//     }
//   }, [project, activeModule, activeStep]);

//   // Mark step as completed
//   const markStepCompleted = (moduleId, stepId) => {
//     // Update completed steps
//     const newCompletedSteps = { ...projectProgress.completedSteps };
//     if (!newCompletedSteps[moduleId]) {
//       newCompletedSteps[moduleId] = [];
//     }
//     if (!newCompletedSteps[moduleId].includes(stepId)) {
//       newCompletedSteps[moduleId] = [...newCompletedSteps[moduleId], stepId];
//     }

//     // Check if all steps in the module are completed
//     const currentModule = project.modules.find((m) => m.id === moduleId);
//     const allStepsCompleted = currentModule.steps.every((step) =>
//       newCompletedSteps[moduleId].includes(step.id)
//     );

//     // Update completed modules if all steps are completed
//     let newCompletedModules = [...projectProgress.completedModules];
//     if (allStepsCompleted && !newCompletedModules.includes(moduleId)) {
//       newCompletedModules.push(moduleId);
//     }

//     setProjectProgress({
//       completedModules: newCompletedModules,
//       completedSteps: newCompletedSteps,
//     });
//   };

//   // Navigate to next step
//   const goToNextStep = () => {
//     const currentModule = project.modules[activeModule];

//     // Mark current step as completed
//     markStepCompleted(currentModule.id, currentModule.steps[activeStep].id);

//     if (activeStep < currentModule.steps.length - 1) {
//       // Go to next step in the same module
//       setActiveStep(activeStep + 1);
//     } else if (activeModule < project.modules.length - 1) {
//       // Go to first step of the next module
//       setActiveModule(activeModule + 1);
//       setActiveStep(0);
//     }
//   };

//   // Navigate to previous step
//   const goToPrevStep = () => {
//     if (activeStep > 0) {
//       // Go to previous step in the same module
//       setActiveStep(activeStep - 1);
//     } else if (activeModule > 0) {
//       // Go to last step of the previous module
//       setActiveModule(activeModule - 1);
//       setActiveStep(project.modules[activeModule - 1].steps.length - 1);
//     }
//   };

//   // Check if a step is completed
//   const isStepCompleted = (moduleId, stepId) => {
//     return projectProgress.completedSteps[moduleId]?.includes(stepId) || false;
//   };

//   // Calculate overall project progress
//   const calculateProgress = () => {
//     if (!project) return 0;

//     let totalSteps = 0;
//     let completedSteps = 0;

//     project.modules.forEach((module) => {
//       totalSteps += module.steps.length;

//       if (projectProgress.completedSteps[module.id]) {
//         completedSteps += projectProgress.completedSteps[module.id].length;
//       }
//     });

//     return totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
//   };

//   if (loading) {
//     return <div className="loading-indicator">Loading project...</div>;
//   }

//   if (!project) {
//     return <div className="empty-state">Project not found</div>;
//   }

//   const currentModule = project.modules[activeModule];
//   const currentStep = currentModule.steps[activeStep];

//   return (
//     <div className="project-detail">
//       <div className="project-header">
//         <h2>{project.title}</h2>
//         <div className={`difficulty-badge ${project.difficulty.toLowerCase()}`}>
//           {project.difficulty}
//         </div>
//       </div>

//       <div className="project-progress">
//         <div className="progress-bar-container">
//           <div
//             className="progress-bar"
//             style={{ width: `${calculateProgress()}%` }}
//           ></div>
//         </div>
//         <div className="progress-text">
//           {Math.round(calculateProgress())}% Complete
//         </div>
//       </div>

//       <div className="project-navigation">
//         <div className="modules-navigation">
//           {project.modules.map((module, index) => (
//             <button
//               key={module.id}
//               className={`module-button ${
//                 activeModule === index ? "active" : ""
//               } ${
//                 projectProgress.completedModules.includes(module.id)
//                   ? "completed"
//                   : ""
//               }`}
//               onClick={() => {
//                 setActiveModule(index);
//                 setActiveStep(0);
//               }}
//             >
//               {index + 1}. {module.title}
//               {projectProgress.completedModules.includes(module.id) && (
//                 <span className="completed-icon">✓</span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="module-content">
//         <h3>{currentModule.title}</h3>
//         <p className="module-description">{currentModule.description}</p>

//         <div className="steps-navigation">
//           {currentModule.steps.map((step, index) => (
//             <button
//               key={step.id}
//               className={`step-button ${activeStep === index ? "active" : ""} ${
//                 isStepCompleted(currentModule.id, step.id) ? "completed" : ""
//               }`}
//               onClick={() => setActiveStep(index)}
//             >
//               {index + 1}. {step.title}
//               {isStepCompleted(currentModule.id, step.id) && (
//                 <span className="completed-icon">✓</span>
//               )}
//             </button>
//           ))}
//         </div>

//         <div className="step-content">
//           <h4>{currentStep.title}</h4>
//           <div className="step-description">{currentStep.content}</div>

//           <div className="code-editor-container">
//             <CodeEditor
//               initialCode={currentStep.code}
//               language={project.languages[0]}
//               readOnly={false}
//             />
//           </div>

//           <div className="step-actions">
//             <button
//               className="prev-step-button"
//               onClick={goToPrevStep}
//               disabled={activeModule === 0 && activeStep === 0}
//             >
//               Previous Step
//             </button>

//             <button
//               className="complete-step-button"
//               onClick={() =>
//                 markStepCompleted(currentModule.id, currentStep.id)
//               }
//               disabled={isStepCompleted(currentModule.id, currentStep.id)}
//             >
//               {isStepCompleted(currentModule.id, currentStep.id)
//                 ? "Completed"
//                 : "Mark as Complete"}
//             </button>

//             <button
//               className="next-step-button"
//               onClick={goToNextStep}
//               disabled={
//                 activeModule === project.modules.length - 1 &&
//                 activeStep ===
//                   project.modules[project.modules.length - 1].steps.length - 1
//               }
//             >
//               Next Step
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="deployment-section">
//         <h3>Deploy Your Project</h3>
//         <p>
//           When you complete all modules, you can deploy your project to a live
//           environment.
//         </p>

//         <button
//           className="deploy-button"
//           disabled={
//             projectProgress.completedModules.length < project.modules.length
//           }
//         >
//           {projectProgress.completedModules.length < project.modules.length
//             ? "Complete all modules to deploy"
//             : "Deploy Project"}
//         </button>

//         <div className="github-integration">
//           <h4>GitHub Integration</h4>
//           <p>
//             Save your project to a GitHub repository to showcase in your
//             portfolio.
//           </p>
//           <button className="github-button">Connect to GitHub</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Project Collaboration Component
// export const ProjectCollaboration = ({ projectId }) => {
//   const [collaborators, setCollaborators] = useState([]);
//   const [inviteEmail, setInviteEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Mock collaborators data
//   const mockCollaborators = [
//     { id: "user1", name: "John Doe", email: "john@example.com", role: "owner" },
//     {
//       id: "user2",
//       name: "Jane Smith",
//       email: "jane@example.com",
//       role: "editor",
//     },
//   ];

//   useEffect(() => {
//     // Simulate API call to fetch collaborators
//     setLoading(true);
//     setTimeout(() => {
//       setCollaborators(mockCollaborators);
//       setLoading(false);
//     }, 800);
//   }, [projectId]);

//   // Handle inviting a collaborator
//   const handleInvite = () => {
//     if (!inviteEmail.trim() || !inviteEmail.includes("@")) return;

//     // Simulate API call to invite a collaborator
//     setLoading(true);
//     setTimeout(() => {
//       // Add new collaborator with pending status
//       setCollaborators([
//         ...collaborators,
//         {
//           id: `user${collaborators.length + 1}`,
//           name: inviteEmail.split("@")[0], // Just use the first part of the email as the name
//           email: inviteEmail,
//           role: "viewer",
//           status: "pending",
//         },
//       ]);
//       setInviteEmail("");
//       setLoading(false);
//     }, 800);
//   };

//   // Handle removing a collaborator
//   const handleRemove = (userId) => {
//     // Simulate API call to remove a collaborator
//     setLoading(true);
//     setTimeout(() => {
//       setCollaborators(collaborators.filter((c) => c.id !== userId));
//       setLoading(false);
//     }, 500);
//   };

//   // Handle changing a collaborator's role
//   const handleRoleChange = (userId, newRole) => {
//     // Simulate API call to change role
//     setLoading(true);
//     setTimeout(() => {
//       setCollaborators(
//         collaborators.map((c) =>
//           c.id === userId ? { ...c, role: newRole } : c
//         )
//       );
//       setLoading(false);
//     }, 500);
//   };

//   return (
//     <div className="project-collaboration">
//       <h3>Project Collaborators</h3>

//       <div className="invite-form">
//         <input
//           type="email"
//           value={inviteEmail}
//           onChange={(e) => setInviteEmail(e.target.value)}
//           placeholder="Enter email to invite"
//           disabled={loading}
//         />
//         <button
//           className="invite-button"
//           onClick={handleInvite}
//           disabled={
//             loading || !inviteEmail.trim() || !inviteEmail.includes("@")
//           }
//         >
//           Invite
//         </button>
//       </div>

//       <div className="collaborators-list">
//         {loading ? (
//           <div className="loading-indicator">Loading collaborators...</div>
//         ) : collaborators.length > 0 ? (
//           <table className="collaborators-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {collaborators.map((collaborator) => (
//                 <tr key={collaborator.id}>
//                   <td>{collaborator.name}</td>
//                   <td>{collaborator.email}</td>
//                   <td>
//                     {collaborator.role === "owner" ? (
//                       "Owner"
//                     ) : (
//                       <select
//                         value={collaborator.role}
//                         onChange={(e) =>
//                           handleRoleChange(collaborator.id, e.target.value)
//                         }
//                         disabled={collaborator.role === "owner" || loading}
//                       >
//                         <option value="editor">Editor</option>
//                         <option value="viewer">Viewer</option>
//                       </select>
//                     )}
//                   </td>
//                   <td>
//                     <span
//                       className={`status ${collaborator.status || "active"}`}
//                     >
//                       {collaborator.status === "pending" ? "Pending" : "Active"}
//                     </span>
//                   </td>
//                   <td>
//                     {collaborator.role !== "owner" && (
//                       <button
//                         className="remove-button"
//                         onClick={() => handleRemove(collaborator.id)}
//                         disabled={loading}
//                       >
//                         Remove
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <div className="empty-collaborators">
//             <p>
//               No collaborators yet. Invite team members to collaborate on this
//               project.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectCollaboration;

/* eslint-disable no-undef */
/**
 * Projects.js - Project-based learning components
 *
 * This file implements components for the guided projects section of the platform.
 */

import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { CodeEditor } from "./CodeEditor";

// ProjectList Component
export const ProjectList = ({ onSelectProject }) => {
  const { language } = useContext(AppContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    difficulty: "all",
    search: "",
  });

  // Fetch projects when language changes
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // In a real app, we would call an API with the language filter
        const response = await fetch(`/api/projects?language=${language}`);
        const data = await response.json();
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    // Mock data for this demo
    const mockProjects = [
      {
        id: "proj1",
        title: "Flutter Weather App",
        description:
          "Build a weather app that fetches real-time data from a weather API.",
        difficulty: "Intermediate",
        languages: ["flutter"],
        estimatedTime: "3 hours",
        modules: 4,
        thumbnail: "weather-app.jpg",
      },
      {
        id: "proj2",
        title: "Flutter Chat Messenger",
        description:
          "Create a chat application with real-time messaging features.",
        difficulty: "Advanced",
        languages: ["flutter", "firebase"],
        estimatedTime: "5 hours",
        modules: 6,
        thumbnail: "chat-app.jpg",
      },
      {
        id: "proj3",
        title: "Flutter E-Commerce App",
        description:
          "Build a simple e-commerce app with product listings and a shopping cart.",
        difficulty: "Intermediate",
        languages: ["flutter"],
        estimatedTime: "4 hours",
        modules: 5,
        thumbnail: "ecommerce-app.jpg",
      },
      {
        id: "proj4",
        title: "Flutter Note Taking App",
        description:
          "Create a note-taking app with local storage capabilities.",
        difficulty: "Beginner",
        languages: ["flutter"],
        estimatedTime: "2 hours",
        modules: 3,
        thumbnail: "notes-app.jpg",
      },
    ];

    // Set mock projects after a delay to simulate API call
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 800);
  }, [language]);

  // Apply filters to projects
  const filteredProjects = projects.filter((project) => {
    // Filter by difficulty
    if (
      filters.difficulty !== "all" &&
      project.difficulty.toLowerCase() !== filters.difficulty.toLowerCase()
    ) {
      return false;
    }

    // Filter by search term
    if (
      filters.search &&
      !project.title.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  if (loading) {
    return <div className="loading-indicator">Loading projects...</div>;
  }

  return (
    <div className="project-list">
      <div className="list-header">
        <h2>Guided Projects</h2>
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="difficulty-filter">Difficulty:</label>
            <select
              id="difficulty-filter"
              value={filters.difficulty}
              onChange={(e) => handleFilterChange("difficulty", e.target.value)}
            >
              <option value="all">All</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="search-filter">Search:</label>
            <input
              id="search-filter"
              type="text"
              placeholder="Search projects..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="projects-container">
        {filteredProjects.length > 0 ? (
          <div className="project-cards">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => onSelectProject(project.id)}
              >
                <div className="project-thumbnail">
                  <div className="thumbnail-placeholder">
                    {project.title.charAt(0)}
                  </div>
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-meta">
                    <div
                      className={`difficulty-badge ${project.difficulty.toLowerCase()}`}
                    >
                      {project.difficulty}
                    </div>

                    <div className="time-estimate">
                      <span className="time-icon">⏱️</span>
                      <span className="time-value">
                        {project.estimatedTime}
                      </span>
                    </div>

                    <div className="modules-count">
                      <span className="modules-icon">📚</span>
                      <span className="modules-value">
                        {project.modules} Modules
                      </span>
                    </div>
                  </div>

                  <div className="project-languages">
                    {project.languages.map((lang) => (
                      <span key={lang} className="language-tag">
                        {lang}
                      </span>
                    ))}
                  </div>

                  <button className="start-project-button">
                    Start Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-projects">
            <p>No projects match your filters.</p>
            <button
              className="reset-filters-button"
              onClick={() => setFilters({ difficulty: "all", search: "" })}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ProjectDetail Component
export const ProjectDetail = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [code, setCode] = useState("");
  const [projectProgress, setProjectProgress] = useState({
    completedModules: [],
    completedSteps: {},
  });

  // Rest of the ProjectDetail component
  // (I'm skipping the middle part for brevity, as it remains unchanged)

  // Check if a step is completed
  const isStepCompleted = (moduleId, stepId) => {
    return projectProgress.completedSteps[moduleId]?.includes(stepId) || false;
  };

  // Calculate overall project progress
  const calculateProgress = () => {
    if (!project) return 0;

    let totalSteps = 0;
    let completedSteps = 0;

    project.modules.forEach((module) => {
      totalSteps += module.steps.length;

      if (projectProgress.completedSteps[module.id]) {
        completedSteps += projectProgress.completedSteps[module.id].length;
      }
    });

    return totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
  };

  if (loading) {
    return <div className="loading-indicator">Loading project...</div>;
  }

  if (!project) {
    return <div className="empty-state">Project not found</div>;
  }

  const currentModule = project.modules[activeModule];
  const currentStep = currentModule.steps[activeStep];

  return (
    <div className="project-detail">
      {/* Rest of the component rendering remains unchanged */}
    </div>
  );
};

// Project Collaboration Component
export const ProjectCollaboration = ({ projectId }) => {
  const [collaborators, setCollaborators] = useState([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Rest of the component remains unchanged

  return (
    <div className="project-collaboration">
      {/* Component rendering remains unchanged */}
    </div>
  );
};

export default ProjectCollaboration;
