import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, ZoomControl, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Complete Delhi Metro Lines Configuration
const delhiMetroLines = {
  // Blue Line
  'blue-line': {
    id: 'blue-line',
    name: 'Blue Line',
    color: '#005BA9',
    stations: [
      { name: 'Dwarka Sector 21', coords: [28.5498, 77.0593], code: 'D21' },
      { name: 'Dwarka Sector 8', coords: [28.5602, 77.0678], code: 'D08' },
      { name: 'Dwarka Sector 9', coords: [28.5701, 77.0745], code: 'D09' },
      { name: 'Dwarka Sector 10', coords: [28.5805, 77.0821], code: 'D10' },
      { name: 'Dwarka Sector 11', coords: [28.5903, 77.0892], code: 'D11' },
      { name: 'Dwarka Sector 12', coords: [28.6008, 77.0976], code: 'D12' },
      { name: 'Dwarka Sector 13', coords: [28.6102, 77.1043], code: 'D13' },
      { name: 'Dwarka Sector 14', coords: [28.6207, 77.1129], code: 'D14' },
      { name: 'Dwarka', coords: [28.6295, 77.1198], code: 'DWK' },
      { name: 'Dwarka Mor', coords: [28.6423, 77.1312], code: 'DWM' },
      { name: 'Nawada', coords: [28.6531, 77.1409], code: 'NWD' },
      { name: 'Uttam Nagar West', coords: [28.6645, 77.1512], code: 'UNW' },
      { name: 'Uttam Nagar East', coords: [28.6752, 77.1623], code: 'UNE' },
      { name: 'Janakpuri West', coords: [28.6864, 77.1731], code: 'JPW' },
      { name: 'Janakpuri East', coords: [28.6978, 77.1845], code: 'JPE' },
      { name: 'Tilak Nagar', coords: [28.7089, 77.1956], code: 'TNG' },
      { name: 'Subhash Nagar', coords: [28.7192, 77.2063], code: 'SBN' },
      { name: 'Tagore Garden', coords: [28.7304, 77.2178], code: 'TGR' },
      { name: 'Rajouri Garden', coords: [28.7415, 77.2289], code: 'RJG' },
      { name: 'Ramesh Nagar', coords: [28.7526, 77.2401], code: 'RMN' },
      { name: 'Moti Nagar', coords: [28.7637, 77.2512], code: 'MTN' },
      { name: 'Kirti Nagar', coords: [28.7748, 77.2623], code: 'KRN' },
      { name: 'Shadipur', coords: [28.7859, 77.2734], code: 'SDP' },
      { name: 'Patel Nagar', coords: [28.7970, 77.2845], code: 'PTN' },
      { name: 'Rajendra Place', coords: [28.8081, 77.2956], code: 'RJP' },
      { name: 'Karol Bagh', coords: [28.8192, 77.3067], code: 'KLB' },
      { name: 'Jhandewalan', coords: [28.8303, 77.3178], code: 'JDL' },
      { name: 'RK Ashram Marg', coords: [28.8414, 77.3289], code: 'RKA' },
      { name: 'Rajiv Chowk', coords: [28.8525, 77.3400], code: 'RJC' },
      { name: 'Barakhamba Road', coords: [28.8636, 77.3511], code: 'BRB' },
      { name: 'Mandi House', coords: [28.8747, 77.3622], code: 'MDH' },
      { name: 'Supreme Court', coords: [28.8858, 77.3733], code: 'SPC' },
      { name: 'Indraprastha', coords: [28.8969, 77.3844], code: 'IDP' },
      { name: 'Yamuna Bank', coords: [28.9080, 77.3955], code: 'YMB' },
      { name: 'Akshardham', coords: [28.9191, 77.4066], code: 'AKS' },
      { name: 'Mayur Vihar Phase-1', coords: [28.9302, 77.4177], code: 'MVP1' },
      { name: 'Mayur Vihar Ext', coords: [28.9413, 77.4288], code: 'MVE' },
      { name: 'New Ashok Nagar', coords: [28.9524, 77.4399], code: 'NAN' },
      { name: 'Noida Sector 15', coords: [28.9635, 77.4510], code: 'NS15' },
      { name: 'Noida Sector 16', coords: [28.9746, 77.4621], code: 'NS16' },
      { name: 'Noida Sector 18', coords: [28.9857, 77.4732], code: 'NS18' },
      { name: 'Botanical Garden', coords: [28.9968, 77.4843], code: 'BTG' },
      { name: 'Golf Course', coords: [29.0079, 77.4954], code: 'GFC' },
      { name: 'Noida City Center', coords: [29.0190, 77.5065], code: 'NCC' },
      { name: 'Noida Sector 34', coords: [29.0301, 77.5176], code: 'NS34' },
      { name: 'Noida Sector 52', coords: [29.0412, 77.5287], code: 'NS52' },
      { name: 'Noida Sector 61', coords: [29.0523, 77.5398], code: 'NS61' },
      { name: 'Noida Sector 59', coords: [29.0634, 77.5509], code: 'NS59' },
      { name: 'Noida Sector 62', coords: [29.0745, 77.5620], code: 'NS62' },
      { name: 'Noida Electronic City', coords: [29.0856, 77.5731], code: 'NEC' }
    ],
    frequency: '4 mins'
  },

  // Red Line
  'red-line': {
    id: 'red-line',
    name: 'Red Line',
    color: '#FF0000',
    stations: [
      { name: 'Rithala', coords: [28.7234, 77.0812], code: 'RTL' },
      { name: 'Rohini West', coords: [28.7123, 77.0923], code: 'RNW' },
      { name: 'Rohini East', coords: [28.7012, 77.1034], code: 'RNE' },
      { name: 'Pitampura', coords: [28.6901, 77.1145], code: 'PTP' },
      { name: 'Kohat Enclave', coords: [28.6790, 77.1256], code: 'KHE' },
      { name: 'Netaji Subhash Place', coords: [28.6679, 77.1367], code: 'NSP' },
      { name: 'Keshav Puram', coords: [28.6568, 77.1478], code: 'KSP' },
      { name: 'Kanhaiya Nagar', coords: [28.6457, 77.1589], code: 'KHN' },
      { name: 'Inderlok', coords: [28.6346, 77.1700], code: 'IDL' },
      { name: 'Shastri Nagar', coords: [28.6235, 77.1811], code: 'STN' },
      { name: 'Pratap Nagar', coords: [28.6124, 77.1922], code: 'PTN' },
      { name: 'Pul Bangash', coords: [28.6013, 77.2033], code: 'PBG' },
      { name: 'Tis Hazari', coords: [28.5902, 77.2144], code: 'THZ' },
      { name: 'Kashmere Gate', coords: [28.5791, 77.2255], code: 'KSG' },
      { name: 'Shastri Park', coords: [28.5680, 77.2366], code: 'STP' },
      { name: 'Seelampur', coords: [28.5569, 77.2477], code: 'SLP' },
      { name: 'Welcome', coords: [28.5458, 77.2588], code: 'WCM' },
      { name: 'Shahdara', coords: [28.5347, 77.2699], code: 'SHD' },
      { name: 'Mansarovar Park', coords: [28.5236, 77.2810], code: 'MSP' },
      { name: 'Jhilmil', coords: [28.5125, 77.2921], code: 'JHL' },
      { name: 'Dilshad Garden', coords: [28.5014, 77.3032], code: 'DLG' },
      { name: 'Shaheed Sthal', coords: [28.4903, 77.3143], code: 'SHS' }
    ],
    frequency: '5 mins'
  },

  // Yellow Line
  'yellow-line': {
    id: 'yellow-line',
    name: 'Yellow Line',
    color: '#FFD700',
    stations: [
      { name: 'Samaypur Badli', coords: [28.7690, 77.1560], code: 'SMP' },
      { name: 'Rohini Sector 18', coords: [28.7590, 77.1620], code: 'RS18' },
      { name: 'Haiderpur Badli Mor', coords: [28.7490, 77.1680], code: 'HBM' },
      { name: 'Jahangirpuri', coords: [28.7390, 77.1740], code: 'JHP' },
      { name: 'Adarsh Nagar', coords: [28.7290, 77.1800], code: 'ADN' },
      { name: 'Azadpur', coords: [28.7190, 77.1860], code: 'AZP' },
      { name: 'Model Town', coords: [28.7090, 77.1920], code: 'MTN' },
      { name: 'Guru Tegh Bahadur Nagar', coords: [28.6990, 77.1980], code: 'GTB' },
      { name: 'Vishwa Vidyalaya', coords: [28.6890, 77.2040], code: 'VV' },
      { name: 'Vidhan Sabha', coords: [28.6790, 77.2100], code: 'VS' },
      { name: 'Civil Lines', coords: [28.6690, 77.2160], code: 'CL' },
      { name: 'Kashmere Gate', coords: [28.6679, 77.2277], code: 'KSG' },
      { name: 'Chandni Chowk', coords: [28.6580, 77.2300], code: 'CC' },
      { name: 'Chawri Bazar', coords: [28.6480, 77.2350], code: 'CHB' },
      { name: 'New Delhi', coords: [28.6420, 77.2200], code: 'ND' },
      { name: 'Rajiv Chowk', coords: [28.6429, 77.2205], code: 'RJC' },
      { name: 'Patel Chowk', coords: [28.6300, 77.2170], code: 'PC' },
      { name: 'Central Secretariat', coords: [28.6139, 77.2089], code: 'CS' },
      { name: 'Udyog Bhawan', coords: [28.6039, 77.2000], code: 'UB' },
      { name: 'Lok Kalyan Marg', coords: [28.5939, 77.1911], code: 'LKM' },
      { name: 'Jor Bagh', coords: [28.5839, 77.1822], code: 'JBG' },
      { name: 'INA', coords: [28.5739, 77.1733], code: 'INA' },
      { name: 'AIIMS', coords: [28.5639, 77.1644], code: 'AIIMS' },
      { name: 'Green Park', coords: [28.5539, 77.1555], code: 'GP' },
      { name: 'Hauz Khas', coords: [28.5439, 77.1466], code: 'HK' },
      { name: 'Malviya Nagar', coords: [28.5339, 77.1377], code: 'MN' },
      { name: 'Saket', coords: [28.5239, 77.1288], code: 'SKT' },
      { name: 'Qutub Minar', coords: [28.5139, 77.1199], code: 'QM' },
      { name: 'Chhatarpur', coords: [28.5039, 77.1110], code: 'CHP' },
      { name: 'Sultanpur', coords: [28.4939, 77.1021], code: 'SLT' },
      { name: 'Ghitorni', coords: [28.4839, 77.0932], code: 'GHT' },
      { name: 'Arjan Garh', coords: [28.4739, 77.0843], code: 'AJG' },
      { name: 'Guru Dronacharya', coords: [28.4639, 77.0754], code: 'GD' },
      { name: 'Sikandarpur', coords: [28.4539, 77.0665], code: 'SKP' },
      { name: 'MG Road', coords: [28.4439, 77.0576], code: 'MGR' },
      { name: 'IFFCO Chowk', coords: [28.4339, 77.0487], code: 'IFF' },
      { name: 'Huda City Centre', coords: [28.4239, 77.0398], code: 'HCC' }
    ],
    frequency: '3 mins'
  },

  // Violet Line
  'violet-line': {
    id: 'violet-line',
    name: 'Violet Line',
    color: '#8A2BE2',
    stations: [
      { name: 'Kashmere Gate', coords: [28.6679, 77.2277], code: 'KSG' },
      { name: 'Lal Qila', coords: [28.6579, 77.2377], code: 'LQ' },
      { name: 'Jama Masjid', coords: [28.6479, 77.2477], code: 'JM' },
      { name: 'Delhi Gate', coords: [28.6379, 77.2577], code: 'DG' },
      { name: 'ITO', coords: [28.6279, 77.2677], code: 'ITO' },
      { name: 'Mandi House', coords: [28.6179, 77.2777], code: 'MDH' },
      { name: 'Janpath', coords: [28.6079, 77.2877], code: 'JPT' },
      { name: 'Central Secretariat', coords: [28.6139, 77.2089], code: 'CS' },
      { name: 'Khan Market', coords: [28.6000, 77.2270], code: 'KM' },
      { name: 'Jawaharlal Nehru Stadium', coords: [28.5830, 77.2320], code: 'JLN' },
      { name: 'Jangpura', coords: [28.5730, 77.2420], code: 'JGP' },
      { name: 'Lajpat Nagar', coords: [28.5630, 77.2520], code: 'LJN' },
      { name: 'Moolchand', coords: [28.5530, 77.2620], code: 'MCH' },
      { name: 'Kailash Colony', coords: [28.5430, 77.2720], code: 'KC' },
      { name: 'Nehru Place', coords: [28.5330, 77.2820], code: 'NP' },
      { name: 'Kalkaji Mandir', coords: [28.5230, 77.2920], code: 'KJM' },
      { name: 'Govind Puri', coords: [28.5130, 77.3020], code: 'GP' },
      { name: 'Harkesh Nagar Okhla', coords: [28.5030, 77.3120], code: 'HNO' },
      { name: 'Jasola Apollo', coords: [28.4930, 77.3220], code: 'JA' },
      { name: 'Sarita Vihar', coords: [28.4830, 77.3320], code: 'SV' },
      { name: 'Mohan Estate', coords: [28.4730, 77.3420], code: 'ME' },
      { name: 'Tughlakabad', coords: [28.4630, 77.3520], code: 'TGD' },
      { name: 'Badarpur', coords: [28.4530, 77.3620], code: 'BDP' },
      { name: 'Sarai', coords: [28.4430, 77.3720], code: 'SRI' },
      { name: 'NHPC Chowk', coords: [28.4330, 77.3820], code: 'NHPC' },
      { name: 'Mewala Maharajpur', coords: [28.4230, 77.3920], code: 'MM' },
      { name: 'Sector-28', coords: [28.4130, 77.4020], code: 'S28' },
      { name: 'Badkal Mor', coords: [28.4030, 77.4120], code: 'BM' },
      { name: 'Old Faridabad', coords: [28.3930, 77.4220], code: 'OF' },
      { name: 'Neelam Chowk Ajronda', coords: [28.3830, 77.4320], code: 'NCA' },
      { name: 'Bata Chowk', coords: [28.3730, 77.4420], code: 'BTC' },
      { name: 'Escorts Mujesar', coords: [28.3630, 77.4520], code: 'EM' },
      { name: 'Sant Surdas - Sihi', coords: [28.3530, 77.4620], code: 'SSS' },
      { name: 'Raja Nahar Singh', coords: [28.3430, 77.4720], code: 'RNS' }
    ],
    frequency: '5 mins'
  },

  // Pink Line
  'pink-line': {
    id: 'pink-line',
    name: 'Pink Line',
    color: '#FF69B4',
    stations: [
      { name: 'Majlis Park', coords: [28.6990, 77.1900], code: 'MJP' },
      { name: 'Azadpur', coords: [28.7090, 77.1860], code: 'AZP' },
      { name: 'Shalimar Bagh', coords: [28.7190, 77.1820], code: 'SHB' },
      { name: 'Netaji Subhash Place', coords: [28.6679, 77.1367], code: 'NSP' },
      { name: 'Shakurpur', coords: [28.6790, 77.1600], code: 'SKP' },
      { name: 'Punjabi Bagh West', coords: [28.6890, 77.1550], code: 'PBW' },
      { name: 'ESI Hospital', coords: [28.6990, 77.1500], code: 'ESI' },
      { name: 'Rajouri Garden', coords: [28.6512, 77.1293], code: 'RJG' },
      { name: 'Mayapuri', coords: [28.6312, 77.1393], code: 'MYP' },
      { name: 'Naraina Vihar', coords: [28.6212, 77.1493], code: 'NV' },
      { name: 'Delhi Cantonment', coords: [28.6112, 77.1593], code: 'DC' },
      { name: 'Durgabai Deshmukh South Campus', coords: [28.6012, 77.1693], code: 'DDSC' },
      { name: 'Sir Vishweshwaraiah Moti Bagh', coords: [28.5912, 77.1793], code: 'SVMB' },
      { name: 'Bhikaji Cama Place', coords: [28.5812, 77.1893], code: 'BCP' },
      { name: 'Sarojini Nagar', coords: [28.5712, 77.1993], code: 'SN' },
      { name: 'INA', coords: [28.5739, 77.1733], code: 'INA' },
      { name: 'South Extension', coords: [28.5612, 77.2193], code: 'SE' },
      { name: 'Lajpat Nagar', coords: [28.5700, 77.2430], code: 'LJN' },
      { name: 'Vinobapuri', coords: [28.5612, 77.2593], code: 'VBP' },
      { name: 'Ashram', coords: [28.5512, 77.2693], code: 'ASH' },
      { name: 'Sarai Kale Khan - Nizamuddin', coords: [28.5412, 77.2793], code: 'SKN' },
      { name: 'Mayur Vihar-I', coords: [28.6100, 77.2893], code: 'MVP1' },
      { name: 'Mayur Vihar Pocket-1', coords: [28.6000, 77.2993], code: 'MVP' },
      { name: 'Trilokpuri-Sanjay Lake', coords: [28.5900, 77.3093], code: 'TSL' },
      { name: 'Vinod Nagar East', coords: [28.5800, 77.3193], code: 'VNE' },
      { name: 'Vinod Nagar West', coords: [28.5700, 77.3293], code: 'VNW' },
      { name: 'IP Extension', coords: [28.5600, 77.3393], code: 'IPE' },
      { name: 'Anand Vihar', coords: [28.6500, 77.3493], code: 'AV' },
      { name: 'Karkarduma', coords: [28.6400, 77.3593], code: 'KDM' },
      { name: 'Karkarduma Court', coords: [28.6300, 77.3693], code: 'KDC' },
      { name: 'Krishna Nagar', coords: [28.6200, 77.3793], code: 'KN' },
      { name: 'East Azad Nagar', coords: [28.6100, 77.3893], code: 'EAZ' },
      { name: 'Welcome', coords: [28.6700, 77.3993], code: 'WCM' },
      { name: 'Jaffrabad', coords: [28.6800, 77.4093], code: 'JFD' },
      { name: 'Maujpur - Babarpur', coords: [28.6900, 77.4193], code: 'MBP' },
      { name: 'Gokulpuri', coords: [28.7000, 77.4293], code: 'GKP' },
      { name: 'Johri Enclave', coords: [28.7100, 77.4393], code: 'JE' },
      { name: 'Shiv Vihar', coords: [28.7200, 77.4493], code: 'SVH' }
    ],
    frequency: '4 mins'
  },

  // Magenta Line
  'magenta-line': {
    id: 'magenta-line',
    name: 'Magenta Line',
    color: '#FF00FF',
    stations: [
      { name: 'Janakpuri West', coords: [28.6310, 77.0890], code: 'JPW' },
      { name: 'Dabri Mor', coords: [28.6210, 77.0990], code: 'DM' },
      { name: 'Dashrath Puri', coords: [28.6110, 77.1090], code: 'DP' },
      { name: 'Palam', coords: [28.6010, 77.1190], code: 'PAL' },
      { name: 'Sadar Bazaar Cantonment', coords: [28.5910, 77.1290], code: 'SBC' },
      { name: 'Terminal 1-IGI Airport', coords: [28.5810, 77.1390], code: 'T1' },
      { name: 'Shankar Vihar', coords: [28.5710, 77.1490], code: 'SKV' },
      { name: 'Vasant Vihar', coords: [28.5610, 77.1590], code: 'VV' },
      { name: 'Munirka', coords: [28.5510, 77.1690], code: 'MUN' },
      { name: 'RK Puram', coords: [28.5410, 77.1790], code: 'RKP' },
      { name: 'IIT Delhi', coords: [28.5310, 77.1890], code: 'IIT' },
      { name: 'Hauz Khas', coords: [28.5439, 77.1466], code: 'HK' },
      { name: 'Panchsheel Park', coords: [28.5210, 77.2090], code: 'PSP' },
      { name: 'Chirag Delhi', coords: [28.5110, 77.2190], code: 'CD' },
      { name: 'Greater Kailash', coords: [28.5010, 77.2290], code: 'GK' },
      { name: 'Nehru Enclave', coords: [28.4910, 77.2390], code: 'NE' },
      { name: 'Kalkaji Mandir', coords: [28.5230, 77.2920], code: 'KJM' },
      { name: 'Okhla NSIC', coords: [28.4810, 77.2590], code: 'ONS' },
      { name: 'Sukhdev Vihar', coords: [28.4710, 77.2690], code: 'SKV' },
      { name: 'Jamia Millia Islamia', coords: [28.4610, 77.2790], code: 'JMI' },
      { name: 'Okhla Vihar', coords: [28.4510, 77.2890], code: 'OV' },
      { name: 'Jasola Vihar Shaheen Bagh', coords: [28.4410, 77.2990], code: 'JVS' },
      { name: 'Kalindi Kunj', coords: [28.4310, 77.3090], code: 'KK' },
      { name: 'Okhla Bird Sanctuary', coords: [28.4210, 77.3190], code: 'OBS' },
      { name: 'Botanical Garden', coords: [28.9968, 77.4843], code: 'BTG' }
    ],
    frequency: '4 mins'
  },

  // Orange Line (Airport Express)
  'orange-line': {
    id: 'orange-line',
    name: 'Airport Express',
    color: '#FFA500',
    stations: [
      { name: 'New Delhi', coords: [28.6420, 77.2200], code: 'ND' },
      { name: 'Shivaji Stadium', coords: [28.6320, 77.2300], code: 'SS' },
      { name: 'Dhaula Kuan', coords: [28.6000, 77.1700], code: 'DK' },
      { name: 'Delhi Aerocity', coords: [28.5500, 77.1200], code: 'DAC' },
      { name: 'IGI Airport', coords: [28.5566, 77.1000], code: 'IGI' },
      { name: 'Dwarka Sector 21', coords: [28.5498, 77.0593], code: 'D21' }
    ],
    frequency: '10 mins'
  },

  // Green Line
  'green-line': {
    id: 'green-line',
    name: 'Green Line',
    color: '#008000',
    stations: [
      { name: 'Inderlok', coords: [28.6700, 77.1700], code: 'IDL' },
      { name: 'Ashok Park Main', coords: [28.6600, 77.1800], code: 'APM' },
      { name: 'Punjabi Bagh', coords: [28.6700, 77.1900], code: 'PB' },
      { name: 'Shivaji Park', coords: [28.6800, 77.2000], code: 'SHP' },
      { name: 'Madipur', coords: [28.6900, 77.2100], code: 'MDP' },
      { name: 'Paschim Vihar East', coords: [28.7000, 77.2200], code: 'PVE' },
      { name: 'Paschim Vihar West', coords: [28.7100, 77.2300], code: 'PVW' },
      { name: 'Peera Garhi', coords: [28.7200, 77.2400], code: 'PG' },
      { name: 'Udyog Nagar', coords: [28.7300, 77.2500], code: 'UN' },
      { name: 'Surajmal Stadium', coords: [28.7400, 77.2600], code: 'SMS' },
      { name: 'Nangloi', coords: [28.7500, 77.2700], code: 'NGL' },
      { name: 'Nangloi Railway Station', coords: [28.7600, 77.2800], code: 'NRS' },
      { name: 'Rajdhani Park', coords: [28.7700, 77.2900], code: 'RDP' },
      { name: 'Mundka', coords: [28.7800, 77.3000], code: 'MUK' },
      { name: 'Mundka Industrial Area', coords: [28.7900, 77.3100], code: 'MIA' },
      { name: 'Ghevra', coords: [28.8000, 77.3200], code: 'GVR' },
      { name: 'Tikri Kalan', coords: [28.8100, 77.3300], code: 'TK' },
      { name: 'Tikri Border', coords: [28.8200, 77.3400], code: 'TB' },
      { name: 'Pandit Shree Ram Sharma', coords: [28.8300, 77.3500], code: 'PSRS' },
      { name: 'Bahadurgarh City', coords: [28.8400, 77.3600], code: 'BHC' },
      { name: 'Brigadier Hoshiar Singh', coords: [28.8500, 77.3700], code: 'BHS' }
    ],
    frequency: '8 mins'
  },

  // Grey Line
  'grey-line': {
    id: 'grey-line',
    name: 'Grey Line',
    color: '#808080',
    stations: [
      { name: 'Dwarka', coords: [28.6295, 77.1198], code: 'DWK' },
      { name: 'Nangli', coords: [28.6195, 77.1298], code: 'NGL' },
      { name: 'Najafgarh', coords: [28.6095, 77.1398], code: 'NJF' },
      { name: 'Dhansa Bus Stand', coords: [28.5995, 77.1498], code: 'DBS' }
    ],
    frequency: '10 mins'
  },

  // Rapid Metro (Gurugram)
  'rapid-metro': {
    id: 'rapid-metro',
    name: 'Rapid Metro',
    color: '#00BFFF',
    stations: [
      { name: 'Sector 55-56', coords: [28.4239, 77.0398], code: 'S55' },
      { name: 'Sector 54 Chowk', coords: [28.4339, 77.0498], code: 'S54' },
      { name: 'Sector 53-54', coords: [28.4439, 77.0598], code: 'S53' },
      { name: 'Sector 42-43', coords: [28.4539, 77.0698], code: 'S42' },
      { name: 'Phase 1', coords: [28.4639, 77.0798], code: 'P1' },
      { name: 'Sikandarpur', coords: [28.4739, 77.0898], code: 'SKP' },
      { name: 'Phase 2', coords: [28.4839, 77.0998], code: 'P2' },
      { name: 'Belvedere Towers', coords: [28.4939, 77.1098], code: 'BT' },
      { name: 'Cyber City', coords: [28.5039, 77.1198], code: 'CC' },
      { name: 'Moulsari Avenue', coords: [28.5139, 77.1298], code: 'MA' },
      { name: 'Phase 3', coords: [28.5239, 77.1398], code: 'P3' }
    ],
    frequency: '4 mins'
  },

  // Aqua Line (Noida-Greater Noida)
  'aqua-line': {
    id: 'aqua-line',
    name: 'Aqua Line',
    color: '#00FFFF',
    stations: [
      { name: 'Noida Sector 51', coords: [28.5800, 77.3620], code: 'NS51' },
      { name: 'Noida Sector 50', coords: [28.5700, 77.3720], code: 'NS50' },
      { name: 'Noida Sector 76', coords: [28.5600, 77.3820], code: 'NS76' },
      { name: 'Noida Sector 101', coords: [28.5500, 77.3920], code: 'NS101' },
      { name: 'Noida Sector 81', coords: [28.5400, 77.4020], code: 'NS81' },
      { name: 'NSEZ', coords: [28.5300, 77.4120], code: 'NSEZ' },
      { name: 'Noida Sector 83', coords: [28.5200, 77.4220], code: 'NS83' },
      { name: 'Noida Sector 137', coords: [28.5100, 77.4320], code: 'NS137' },
      { name: 'Noida Sector 142', coords: [28.5000, 77.4420], code: 'NS142' },
      { name: 'Noida Sector 143', coords: [28.4900, 77.4520], code: 'NS143' },
      { name: 'Noida Sector 144', coords: [28.4800, 77.4620], code: 'NS144' },
      { name: 'Noida Sector 145', coords: [28.4700, 77.4720], code: 'NS145' },
      { name: 'Noida Sector 146', coords: [28.4600, 77.4820], code: 'NS146' },
      { name: 'Noida Sector 147', coords: [28.4500, 77.4920], code: 'NS147' },
      { name: 'Noida Sector 148', coords: [28.4400, 77.5020], code: 'NS148' },
      { name: 'Knowledge Park II', coords: [28.4300, 77.5120], code: 'KP2' },
      { name: 'Pari Chowk', coords: [28.4200, 77.5220], code: 'PC' },
      { name: 'Alpha 1', coords: [28.4100, 77.5320], code: 'A1' },
      { name: 'Delta 1', coords: [28.4000, 77.5420], code: 'D1' },
      { name: 'GNIDA Office', coords: [28.3900, 77.5520], code: 'GNIDA' },
      { name: 'Depot Station', coords: [28.3800, 77.5620], code: 'DEP' }
    ],
    frequency: '7 mins'
  },

  // Bus Routes
  'bus-route': {
    id: 'bus-route',
    name: 'Bus Route 24',
    color: '#6B8E23',
    stations: [
      { name: 'ISBT Kashmere Gate', coords: [28.6687, 77.2277], code: 'ISBT' },
      { name: 'Mori Gate', coords: [28.6780, 77.2200], code: 'MOG' },
      { name: 'Pratap Nagar', coords: [28.6880, 77.2100], code: 'PTN' },
      { name: 'Shalimar Bagh', coords: [28.6980, 77.2000], code: 'SHB' },
      { name: 'Azadpur', coords: [28.7080, 77.1900], code: 'AZP' },
      { name: 'Adarsh Nagar', coords: [28.7180, 77.1800], code: 'ADN' },
      { name: 'Badli Mor', coords: [28.7280, 77.1700], code: 'BDM' },
      { name: 'Bawana', coords: [28.7380, 77.1600], code: 'BWN' },
      { name: 'Narela', coords: [28.7480, 77.1500], code: 'NRL' },
      { name: 'Rohini Sector 24', coords: [28.7580, 77.1400], code: 'RS24' }
    ],
    frequency: '15 mins',
    type: 'bus'
  }
};

// Custom Metro Icon
const createMetroIcon = (color, type, zoomLevel) => {
  const iconSize = zoomLevel < 13 ? 0 : // No icons below zoom 13
                   zoomLevel < 14 ? 20 : 
                   zoomLevel < 16 ? 24 : 28;
  
  if (iconSize === 0) return null;
  
  const iconText = type === 'bus' ? 'B' : 'M';
  const iconColor = color || '#005BA9';
  
  return L.divIcon({
    html: `
      <div class="flex items-center justify-center rounded-full border-2 border-white shadow-lg"
           style="width: ${iconSize}px; height: ${iconSize}px; background-color: ${iconColor}">
        <span class="text-white ${zoomLevel < 14 ? 'text-xs' : 'text-sm'} font-bold">
          ${iconText}
        </span>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize / 2, iconSize / 2]
  });
};

// Custom circle for low zoom levels
const createCircleMarker = (color, zoomLevel, isActive) => {
  const radius = zoomLevel < 10 ? 2 : 
                 zoomLevel < 12 ? 3 : 
                 zoomLevel < 14 ? 4 : 5;
  
  return {
    radius,
    fillColor: color,
    color: '#ffffff',
    weight: isActive ? 2 : 1,
    opacity: isActive ? 1 : 0.8,
    fillOpacity: isActive ? 0.9 : 0.6
  };
};

const MetroMap = () => {
  const mapRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [activeLine, setActiveLine] = useState('red-line');
  const [showAllLines, setShowAllLines] = useState(true);
  const [showStationNames, setShowStationNames] = useState(false);
  const [filterType, setFilterType] = useState('all'); // 'all', 'metro', 'bus'
  const [mapCenter] = useState([28.7041, 77.1025]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter lines based on type
  const filteredLines = useMemo(() => {
    return Object.entries(delhiMetroLines).filter(([key, line]) => {
      if (filterType === 'all') return true;
      if (filterType === 'metro') return line.type !== 'bus';
      if (filterType === 'bus') return line.type === 'bus';
      return true;
    });
  }, [filterType]);

  // Filter stations for low zoom levels
  const filteredStations = useMemo(() => {
    const line = delhiMetroLines[activeLine];
    if (!line) return [];
    
    if (zoomLevel < 10) {
      return [
        line.stations[0],
        line.stations[Math.floor(line.stations.length / 2)],
        line.stations[line.stations.length - 1]
      ];
    } else if (zoomLevel < 12) {
      return line.stations.filter((_, index) => index % 3 === 0);
    } else if (zoomLevel < 14) {
      return line.stations.filter((_, index) => index % 2 === 0);
    }
    return line.stations;
  }, [activeLine, zoomLevel]);

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    const results = [];
    
    Object.entries(delhiMetroLines).forEach(([lineId, line]) => {
      line.stations.forEach(station => {
        if (station.name.toLowerCase().includes(query) || 
            station.code.toLowerCase().includes(query)) {
          results.push({
            lineId,
            lineName: line.name,
            station,
            color: line.color
          });
        }
      });
    });
    
    return results.slice(0, 10); // Limit results
  }, [searchQuery]);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      
      map.on('zoom', () => {
        const newZoom = map.getZoom();
        setZoomLevel(newZoom);
        setShowStationNames(newZoom >= 14);
      });

      // Fit to active line bounds
      const activeLineData = delhiMetroLines[activeLine];
      if (activeLineData && activeLineData.stations.length > 0) {
        const bounds = L.latLngBounds(activeLineData.stations.map(s => s.coords));
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [activeLine]);

  const handleRouteSelect = (routeName) => {
    setActiveLine(routeName);
    setShowAllLines(false);
    
    setTimeout(() => {
      setShowAllLines(true);
    }, 300);
  };

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.setView(mapCenter, 12);
      setZoomLevel(12);
      setShowStationNames(false);
    }
  };

  const handleZoomToRoute = () => {
    if (mapRef.current && delhiMetroLines[activeLine]) {
      const bounds = L.latLngBounds(delhiMetroLines[activeLine].stations.map(s => s.coords));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  };

  const handleSearchSelect = (result) => {
    setActiveLine(result.lineId);
    if (mapRef.current) {
      mapRef.current.flyTo(result.station.coords, 15);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Delhi Metro Network</h1>
              <p className="text-blue-100">Complete Delhi NCR Metro & Bus Routes</p>
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-medium">{Object.keys(delhiMetroLines).length} Lines</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-medium">Zoom: {zoomLevel.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left Panel - Controls and Search */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search Box */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-3">Search Stations</h2>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search station or code..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
                
                {searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        onClick={() => handleSearchSelect(result)}
                      >
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: result.color }}
                          ></div>
                          <div>
                            <div className="font-medium text-gray-800">{result.station.name}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-2">
                              <span>Code: {result.station.code}</span>
                              <span>•</span>
                              <span>{result.lineName}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Filter Controls */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-3">Filter Lines</h2>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                    filterType === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('metro')}
                  className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                    filterType === 'metro' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Metro
                </button>
                <button
                  onClick={() => setFilterType('bus')}
                  className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                    filterType === 'bus' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Bus
                </button>
              </div>
            </div>

            {/* Route List */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-800">Metro Lines</h2>
                <span className="text-sm text-gray-500">{filteredLines.length} lines</span>
              </div>
              
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {filteredLines.map(([key, line]) => (
                  <div 
                    key={key}
                    className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                      activeLine === key 
                        ? 'border-blue-500 shadow-md bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleRouteSelect(key)}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-8 rounded-sm"
                        style={{ backgroundColor: line.color }}
                      ></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-800 text-sm">{line.name}</h3>
                          {line.type === 'bus' && (
                            <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
                              BUS
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {line.stations.length} stations • Every {line.frequency}
                        </p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        activeLine === key ? 'bg-blue-600' : 'bg-gray-300'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Controls */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-3">Map Controls</h2>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={handleZoomIn}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-sm">Zoom In</span>
                  </button>
                  
                  <button 
                    onClick={handleZoomOut}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                    <span className="text-sm">Zoom Out</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={handleZoomToRoute}
                    className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span className="text-sm">Focus Route</span>
                  </button>
                  
                  <button 
                    onClick={handleResetView}
                    className="bg-gray-50 hover:bg-gray-100 text-gray-700 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="text-sm">Reset</span>
                  </button>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700">Zoom Level:</span>
                    <span className="text-blue-600 font-bold">{zoomLevel.toFixed(1)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((zoomLevel - 8) / 8) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {zoomLevel < 10 && 'Overview - All lines visible'}
                    {zoomLevel >= 10 && zoomLevel < 13 && 'Route view - Key stations'}
                    {zoomLevel >= 13 && zoomLevel < 15 && 'Detailed - Most stations'}
                    {zoomLevel >= 15 && 'Full detail - All stations with names'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow overflow-hidden h-[600px]">
              <MapContainer
                center={mapCenter}
                zoom={zoomLevel}
                ref={mapRef}
                className="h-full w-full"
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Render filtered metro lines */}
                {filteredLines.map(([lineKey, lineData]) => {
                  const isActive = activeLine === lineKey;
                  const positions = lineData.stations.map(station => station.coords);
                  const displayStations = isActive ? filteredStations : 
                    (zoomLevel >= 13 ? lineData.stations.slice(0, lineData.stations.length) : []);
                  
                  return (
                    <React.Fragment key={lineKey}>
                      {/* Metro/Bus Line */}
                      <Polyline
                        positions={positions}
                        pathOptions={{
                          color: lineData.color,
                          weight: isActive ? (zoomLevel < 12 ? 5 : 6) : (zoomLevel < 12 ? 2 : 3),
                          opacity: isActive ? (zoomLevel < 12 ? 0.9 : 1) : (showAllLines ? 0.3 : 0),
                          dashArray: lineData.type === 'bus' ? '8, 8' : undefined
                        }}
                      />
                      
                      {/* Stations */}
                      {displayStations.map((station, idx) => {
                        const icon = createMetroIcon(
                          lineData.color, 
                          lineData.type === 'bus' ? 'bus' : 'metro', 
                          zoomLevel
                        );
                        
                        // For low zoom, use CircleMarker
                        if (zoomLevel < 13 || !icon) {
                          return (
                            <CircleMarker
                              key={`${lineKey}-${idx}`}
                              center={station.coords}
                              pathOptions={createCircleMarker(lineData.color, zoomLevel, isActive)}
                            >
                              <Popup>
                                <div className="p-2 min-w-[180px]">
                                  <div className="flex items-center gap-2 mb-1">
                                    <div 
                                      className="w-3 h-4 rounded-sm"
                                      style={{ backgroundColor: lineData.color }}
                                    ></div>
                                    <h3 className="font-bold text-gray-800 text-sm">{station.name}</h3>
                                  </div>
                                  <div className="text-xs text-gray-600 space-y-1">
                                    <div>Code: {station.code}</div>
                                    <div>Line: {lineData.name}</div>
                                    <div className="flex items-center gap-1">
                                      Type: 
                                      <span className={`px-1.5 py-0.5 rounded text-xs ${
                                        lineData.type === 'bus' 
                                          ? 'bg-green-100 text-green-800' 
                                          : 'bg-blue-100 text-blue-800'
                                      }`}>
                                        {lineData.type === 'bus' ? 'BUS' : 'METRO'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Popup>
                            </CircleMarker>
                          );
                        }
                        
                        // For high zoom, use Marker with icon
                        return (
                          <Marker
                            key={`${lineKey}-${idx}`}
                            position={station.coords}
                            icon={icon}
                          >
                            <Popup>
                              <div className="p-3 min-w-[200px]">
                                <div className="flex items-center gap-2 mb-2">
                                  <div 
                                    className="w-4 h-6 rounded-sm"
                                    style={{ backgroundColor: lineData.color }}
                                  ></div>
                                  <div>
                                    <h3 className="font-bold text-gray-800">{station.name}</h3>
                                    <p className="text-sm text-gray-600">Code: {station.code}</p>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Line:</span>
                                    <span className="text-sm font-medium" style={{ color: lineData.color }}>
                                      {lineData.name}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Type:</span>
                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                      lineData.type === 'bus' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-blue-100 text-blue-800'
                                    }`}>
                                      {lineData.type === 'bus' ? 'BUS' : 'METRO'}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Frequency:</span>
                                    <span className="text-sm font-medium text-gray-800">{lineData.frequency}</span>
                                  </div>
                                </div>
                              </div>
                            </Popup>
                          </Marker>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
                
                <ZoomControl position="bottomright" />
              </MapContainer>
            </div>

            {/* Legend and Stats */}
            <div className="mt-4 bg-white rounded-lg shadow p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Legend */}
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-3">Metro Lines Legend</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {Object.entries(delhiMetroLines).slice(0, 8).map(([key, line]) => (
                      <div key={key} className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-sm flex-shrink-0"
                          style={{ backgroundColor: line.color }}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700 truncate">{line.name}</span>
                            {line.type === 'bus' && (
                              <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded flex-shrink-0">
                                BUS
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate">
                            {line.stations[0].name} → {line.stations[line.stations.length - 1].name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Active Route Info */}
                {delhiMetroLines[activeLine] && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-3">Active Route</h3>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-6 h-10 rounded-sm"
                          style={{ backgroundColor: delhiMetroLines[activeLine].color }}
                        ></div>
                        <div>
                          <h4 className="font-bold text-gray-800">{delhiMetroLines[activeLine].name}</h4>
                          <p className="text-xs text-gray-600">
                            {delhiMetroLines[activeLine].type === 'bus' ? 'Bus Route' : 'Metro Line'}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <div className="text-xl font-bold text-blue-600">{delhiMetroLines[activeLine].stations.length}</div>
                          <div className="text-xs text-gray-500">Stations</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-600">{delhiMetroLines[activeLine].frequency}</div>
                          <div className="text-xs text-gray-500">Frequency</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-purple-600">
                            {zoomLevel >= 14 ? 'Detail' : 'Normal'}
                          </div>
                          <div className="text-xs text-gray-500">View</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Stats */}
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-3">Network Statistics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Lines:</span>
                      <span className="font-bold text-blue-600">{Object.keys(delhiMetroLines).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Stations:</span>
                      <span className="font-bold text-green-600">
                        {Object.values(delhiMetroLines).reduce((acc, line) => acc + line.stations.length, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Metro Lines:</span>
                      <span className="font-bold text-purple-600">
                        {Object.values(delhiMetroLines).filter(line => line.type !== 'bus').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Bus Routes:</span>
                      <span className="font-bold text-orange-600">
                        {Object.values(delhiMetroLines).filter(line => line.type === 'bus').length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Delhi Metro Network</h3>
              <p className="text-gray-400 text-sm mt-1">Complete Delhi NCR Metro System Map</p>
            </div>
            <div className="mt-2 md:mt-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Live Tracking Active</span>
                </div>
                <div className="text-sm text-gray-400">
                  Zoom: {zoomLevel.toFixed(1)} • {filteredLines.length} lines visible
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetroMap;