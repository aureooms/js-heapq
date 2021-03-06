import { min , sorted , _zip2 , _range , iter } from '@aureooms/js-itertools' ;
import { reverse } from '@aureooms/js-compare' ;

import { keeporder } from './core' ;

import heapify from './heapify' ;
import heapreplace from './heapreplace' ;

export default function nsmallest ( compare , n , iterable ) {

	if ( n === 1 ) {

		const sentinel = { } ;

		const result = min( compare , iterable , sentinel ) ;

		return result === sentinel ? [ ] : [ result ] ;

	}

	if ( iterable.length !== undefined ) {

		if ( n >= iterable.length ) return sorted( compare , iterable ) ;

	}

	const it = iter( iterable ) ;

	const result = Array.from( _zip2( _range( 0 , n , 1 ) , it ) , ( [ i , elem ] ) => [ elem , i ] ) ;

	if ( result.length === 0 ) return result ;

	const h = heapify( keeporder( reverse( compare ) ) , result ) ;

	let top = result[0][0] ;

	let order = n ;

	for ( const elem of it ) {

		if ( compare( elem , top ) < 0 ) {

			heapreplace( h , [ elem , order ] ) ;

			top = result[0][0] ;

			++order ;

		}

	}

	return sorted( compare , Array.from( result , r => r[0] ) ) ;

}
