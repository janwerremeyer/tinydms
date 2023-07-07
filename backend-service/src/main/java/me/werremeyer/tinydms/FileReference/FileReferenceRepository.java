package me.werremeyer.tinydms.FileReference;

import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface FileReferenceRepository extends CrudRepository<FileReference, UUID>
{
}
