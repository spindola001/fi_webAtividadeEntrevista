﻿ALTER PROC FI_SP_DelBeneficiario
	@Id BIGINT
AS
BEGIN
	DELETE BENEFICIARIOS WHERE ID = @Id
END