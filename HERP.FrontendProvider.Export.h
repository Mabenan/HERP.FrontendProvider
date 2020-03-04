/*
 * export.h
 *
 *  Created on: 29.02.2020
 *      Author: doene
 */

#ifndef REPS_HERP_FRONTENDPROVIDER_HERP_FRONTENDPROVIDER_EXPORT_H_
#define REPS_HERP_FRONTENDPROVIDER_HERP_FRONTENDPROVIDER_EXPORT_H_


#ifdef _BUILDING_HERP_FRONTEND_PROVIDER
#define HERP_FRONTEND_PROVIDER_DLL_EXPORT QX_DLL_EXPORT_HELPER
#else // _BUILDING_HERP_FRONTEND_PROVIDER
#define HERP_FRONTEND_PROVIDER_DLL_EXPORT QX_DLL_IMPORT_HELPER
#endif // _BUILDING_HERP_FRONTEND_PROVIDER

#ifdef _BUILDING_HERP_FRONTEND_PROVIDER
#define HERP_REGISTER_HPP_HERP_FRONTEND_PROVIDER QX_REGISTER_HPP_EXPORT_DLL
#define HERP_REGISTER_CPP_HERP_FRONTEND_PROVIDER QX_REGISTER_CPP_EXPORT_DLL
#else // _BUILDING_HERP_FRONTEND_PROVIDER
#define HERP_REGISTER_HPP_HERP_FRONTEND_PROVIDER QX_REGISTER_HPP_IMPORT_DLL
#define HERP_REGISTER_CPP_HERP_FRONTEND_PROVIDER QX_REGISTER_CPP_IMPORT_DLL
#endif // _BUILDING_HERP_FRONTEND_PROVIDER


#endif /* REPS_HERP_FRONTENDPROVIDER_HERP_FRONTENDPROVIDER_EXPORT_H_ */
