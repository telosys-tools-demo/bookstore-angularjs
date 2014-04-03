import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.LinkedList;
import java.util.Map;

import org.telosys.tools.generator.context.EntityInContext;
import org.telosys.tools.generator.context.JavaBeanClassAttribute;
import org.telosys.tools.generator.context.JavaBeanClassForeignKey;
import org.telosys.tools.generator.context.JavaBeanClassForeignKeyColumn;
import org.telosys.tools.generator.context.LinkInContext;
import org.telosys.tools.generator.GeneratorException;

public class Tools {
	

	private void addReferencedEntityTypes( EntityInContext entity, JavaBeanClassAttribute field, List<String> referencedEntityTypes ) 
	throws GeneratorException{
		for( LinkInContext link : entity.getLinks()  ) {
			if( link.isOwningSide() && link.hasJoinColumns() ) {
				for( String joinColumn : link.getJoinColumns() ) {
					if( joinColumn.equals(field.getDatabaseName() ) ) {						
						String referencedEntityType = link.getTargetEntitySimpleType() ;
						if ( referencedEntityTypes.contains(referencedEntityType) == false ) {
							// TODO : unique ? (HashMap)
							referencedEntityTypes.add( link.getTargetEntitySimpleType() );
						}
					}
				}
			}
		}
	}
	
	public List<String> referencedEntityTypes( EntityInContext entity, JavaBeanClassAttribute field) throws GeneratorException {
		List<String> referencedEntityTypes = new LinkedList<String>();
		addReferencedEntityTypes( entity, field, referencedEntityTypes );
		return referencedEntityTypes ;
	}

	public List<String> referencedEntityTypes( EntityInContext entity, List<JavaBeanClassAttribute> fields) throws GeneratorException {
		List<String> referencedEntityTypes = new LinkedList<String>();
		for ( JavaBeanClassAttribute field : fields ) {
			addReferencedEntityTypes( entity, field, referencedEntityTypes );
		}
		return referencedEntityTypes ;
	}
}
